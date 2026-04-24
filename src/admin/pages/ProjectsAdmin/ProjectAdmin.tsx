import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProjects } from "../../../hooks/projects/useProjects";
import { useCreateProject } from "../../../hooks/projects/useCreateProject";
import { useUpdateProject } from "../../../hooks/projects/useUpdateProject";
import { useDeleteProject } from "../../../hooks/projects/useDeleteProject";
import { storageService } from '../../../services/storage.service';

type ProjectForm = {
  title: string;
  slug: string;
  shortDescription: string;
  imageKey?: string;
  imageFile?: FileList;
  demoUrl?: string;
  repoUrl?: string;
  skills?: string;
  featured?: boolean;
  published?: boolean;
  publishedAt?: string;
  adminEmail?: string;
  priority?: number;
  type?: string;
};

export const ProjectAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const { data: projects = [], isLoading, error } = useProjects();
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const { register, handleSubmit, reset } = useForm<ProjectForm>();

  const normalizeArray = (value?: string) => {
    if (!value) return [];
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const openCreateModal = () => {
    setSelectedProject(null);
    reset({
      title: "",
      slug: "",
      shortDescription: "",
      imageKey: "",
      demoUrl: "",
      repoUrl: "",
      skills: "",
      featured: false,
      published: false,
      publishedAt: "",
      adminEmail: "",
      type: "",
      priority:0,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setSelectedProject(project);

    reset({
      title: project.title ?? "",
      slug: project.slug ?? "",
      shortDescription: project.shortDescription ?? "",
      imageKey: project.imageKey ?? "",
      demoUrl: project.demoUrl ?? "",
      repoUrl: project.repoUrl ?? "",
      skills: project.skills?.join(", ") ?? "",
      featured: project.featured ?? false,
      published: project.published ?? false,
      publishedAt: project.publishedAt
        ? project.publishedAt.slice(0, 16)
        : "",
      adminEmail: project.adminEmail ?? "",
      priority: project.priority ?? "",
      type: project.type ?? "",
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const onSubmit = async (data: ProjectForm) => {

    let imageKey = selectedProject?.imageKey || "";
    const file = data.imageFile?.[0];

    if (file) {
      // 1. subir nueva imagen
      const newImageKey = await storageService.uploadProjectImage(file);

      // 2. eliminar la anterior (si existe)
      if (imageKey) {
        await storageService.removeFile(imageKey);
      }

      // 3. usar la nueva
      imageKey = newImageKey;
    }

    const payload: any = {
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      imageKey,
      demoUrl: data.demoUrl || undefined,
      repoUrl: data.repoUrl || undefined,
      skills: normalizeArray(data.skills),
      featured: !!data.featured,
      published: !!data.published,
      adminEmail: data.adminEmail || "",
      priority: data.priority || 0,
      type: data.type || "",
    };

    if (data.published) {
      payload.publishedAt = data.publishedAt
        ? new Date(data.publishedAt).toISOString()
        : new Date().toISOString();
    }

    if (selectedProject) {
      updateProject(
        {
          id: selectedProject.id,
          payload,
        },
        {
          onSuccess: closeModal,
        }
      );
      return;
    }

    createProject(payload, {
      onSuccess: closeModal,
    });

  };

  const handleDelete = () => {
    if (!selectedProject) return;

    deleteProject(selectedProject.id, {
      onSuccess: closeModal,
    });
  };

  if (isLoading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error cargando proyectos</p>;

  return (
    <div>
      <h1>Proyectos</h1>

      <button onClick={openCreateModal}>Crear proyecto</button>

      <hr />

      {projects.length === 0 && <p>No hay proyectos creados.</p>}

      <div style={{color: "white"}}>
        {projects.map((project: any) => (
          <div
            key={project.id}
            onClick={() => openEditModal(project)}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.shortDescription}</p>
            <small>
              Slug: {project.slug} |{" "}
              {project.published ? "Publicado" : "Borrador"} |{" "}
              {project.featured ? "Destacado" : "Normal"}
            </small>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "grid",
            placeItems: "center",
            zIndex: 999,
            color: "black"
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "600px",
              maxWidth: "90%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <h2>{selectedProject ? "Editar proyecto" : "Crear proyecto"}</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Título</label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                />
              </div>

              <div>
                <label>Slug</label>
                <input
                  type="text"
                  {...register("slug", { required: true })}
                />
              </div>

              <div>
                <label>Descripción corta</label>
                <textarea
                  {...register("shortDescription", { required: true })}
                />
              </div>


              <div>
                <label>Image Del Proyecto</label>
                <input type="file" accept="image/*" {...register("imageFile")} />
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

              <div>
                <label>Fecha publicación</label>
                <input type="datetime-local" {...register("publishedAt")} />
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
                <input type="number" {...register("priority", { valueAsNumber: true })} />
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

                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>

                {selectedProject && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};