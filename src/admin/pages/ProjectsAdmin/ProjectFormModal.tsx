import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateProject } from "../../../hooks/projects/useCreateProject";
import { useUpdateProject } from "../../../hooks/projects/useUpdateProject";
import { useDeleteProject } from "../../../hooks/projects/useDeleteProject";
import { storageService } from "../../../services/storage.service";

type ProjectForm = {
  title: string;
  slug: string;
  shortDescription: string;
  imageFile?: FileList;
  imageKey?: string;
  demoUrl?: string;
  repoUrl?: string;
  skills?: string;
  type?: "PROFESSIONAL" | "ACADEMIC";
  priority?: number;
  featured?: boolean;
  published?: boolean;
  publishedAt?: string;
  adminEmail?: string;
};

type Props = {
  isOpen: boolean;
  selectedProject: any | null;
  onClose: () => void;
};

export const ProjectFormModal = ({ isOpen, selectedProject, onClose }: Props) => {
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const { register, handleSubmit, reset } = useForm<ProjectForm>();

  useEffect(() => {
    if (!isOpen) return;

    reset({
      title: selectedProject?.title ?? "",
      slug: selectedProject?.slug ?? "",
      shortDescription: selectedProject?.shortDescription ?? "",
      imageKey: selectedProject?.imageKey ?? "",
      demoUrl: selectedProject?.demoUrl ?? "",
      repoUrl: selectedProject?.repoUrl ?? "",
      skills: selectedProject?.skills?.join(", ") ?? "",
      type: selectedProject?.type ?? "PROFESSIONAL",
      priority: selectedProject?.priority ?? 0,
      featured: selectedProject?.featured ?? false,
      published: selectedProject?.published ?? false,
      publishedAt: selectedProject?.publishedAt
        ? selectedProject.publishedAt.slice(0, 16)
        : "",
      adminEmail: selectedProject?.adminEmail ?? "",
    });
  }, [isOpen, selectedProject, reset]);

  const normalizeArray = (value?: string) => {
    if (!value) return [];

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const buildPayload = async (data: ProjectForm) => {
    let imageKey = selectedProject?.imageKey || "";

    const file = data.imageFile?.[0];

    if (file) {
      imageKey = await storageService.uploadProjectImage(file);
    }

    const payload: any = {
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      imageKey,
      demoUrl: data.demoUrl || undefined,
      repoUrl: data.repoUrl || undefined,
      skills: normalizeArray(data.skills),
      type: data.type ?? "PROFESSIONAL",
      priority: data.priority ?? 0,
      featured: !!data.featured,
      published: !!data.published,
      adminEmail: data.adminEmail || "",
    };

    if (data.published) {
      payload.publishedAt = data.publishedAt
        ? new Date(data.publishedAt).toISOString()
        : new Date().toISOString();
    }

    return {
      payload,
      newImageUploaded: !!file,
      oldImageKey: selectedProject?.imageKey || "",
    };
  };

  const onSubmit = async (data: ProjectForm) => {
    const { payload, newImageUploaded, oldImageKey } = await buildPayload(data);

    if (selectedProject) {
      updateProject(
        {
          id: selectedProject.id,
          payload,
        },
        {
          onSuccess: async () => {
            if (newImageUploaded && oldImageKey) {
              await storageService.removeFile(oldImageKey);
            }

            onClose();
          },
        }
      );

      return;
    }

    createProject(payload, {
      onSuccess: onClose,
    });
  };

  const handleDelete = () => {
    if (!selectedProject) return;

    deleteProject(selectedProject.id, {
      onSuccess: async () => {
        if (selectedProject.imageKey) {
          await storageService.removeFile(selectedProject.imageKey);
        }

        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "grid",
        placeItems: "center",
        zIndex: 999,
      }}
    >
      <div
        className="container-form"
        style={{
          background: "#fff",
          padding: "20px",
          maxWidth: "90%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <h2>{selectedProject ? "Editar proyecto" : "Crear proyecto"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form">
            <div className="form-items form-fields">
              <div>
                <label>Título</label>
                <input type="text" {...register("title", { required: true })} />
              </div>

              <div>
                <label>Slug</label>
                <input type="text" {...register("slug", { required: true })} />
              </div>

              <div>
                <label>Demo URL</label>
                <input type="url" {...register("demoUrl")} />
              </div>

              <div>
                <label>Repo URL</label>
                <input type="url" {...register("repoUrl")} />
              </div>

              <div>
                <label>Skills separadas por coma</label>
                <input type="text" {...register("skills")} />
              </div>

              <div>
                <label>Tipo</label>
                <select {...register("type", { required: true })}>
                  <option value="PROFESSIONAL">Profesional</option>
                  <option value="ACADEMIC">Académico</option>
                </select>
              </div>

              <div>
                <label>Prioridad</label>
                <input
                  type="number"
                  {...register("priority", { valueAsNumber: true })}
                />
              </div>
              
              <div>
                <label>Fecha publicación</label>
                <input type="datetime-local" {...register("publishedAt")} />
              </div>

              <div>
                <label>
                  <input type="checkbox" {...register("featured")} />
                  Destacado
                </label>
              </div>

              <div>
                <label>
                  <input type="checkbox" {...register("published")} />
                  Publicado
                </label>
              </div>

              {/* <div>
                <label>Admin email</label>
                <input type="email" {...register("adminEmail")} />
              </div> */}

            </div>

            <div className="form-fields txt">
              <div>
                <label>Descripción corta</label>
                <textarea rows={5} {...register("shortDescription", { required: true })} />
              </div>

              <div>
                <label>Imagen del proyecto</label>
                <input type="file" accept="image/*" {...register("imageFile")} />
              </div>

              {selectedProject?.imageKey && (
                <small>Imagen actual: {selectedProject.imageKey}</small>
              )}
            </div>

            <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
              <button type="submit" disabled={isCreating || isUpdating}>
                {selectedProject
                  ? isUpdating
                    ? "Actualizando..."
                    : "Actualizar"
                  : isCreating
                  ? "Creando..."
                  : "Crear"}
              </button>

              <button type="button" onClick={onClose}>
                Cancelar
              </button>

              {selectedProject && (
                <button type="button" onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </button>
              )}
            </div>

          </div>


          

        </form>
      </div>
    </div>
  );
};