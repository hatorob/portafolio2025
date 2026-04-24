import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateBlog } from "../../../hooks/blogs/useCreateBlog";
import { useUpdateBlog } from "../../../hooks/blogs/useUpdateBlog";
import { useDeleteBlog } from "../../../hooks/blogs/useDeleteBlog";
import { storageService } from "../../../services/storage.service";

type BlogForm = {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  coverImageKey?: string;
  coverImageFile?: FileList;
  skills?: string;
  published?: boolean;
  publishedAt?: string;
};

type Props = {
  isOpen: boolean;
  selectedBlog: any | null;
  onClose: () => void;
};

export const BlogFormsModal = ({ isOpen, selectedBlog, onClose }: Props) => {
  const { mutate: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  const { register, handleSubmit, reset } = useForm<BlogForm>();

  useEffect(() => {
    if (!isOpen) return;

    reset({
      title: selectedBlog?.title ?? "",
      slug: selectedBlog?.slug ?? "",
      shortDescription: selectedBlog?.shortDescription ?? "",
      content: selectedBlog?.content ?? "",
      coverImageKey: selectedBlog?.coverImageKey ?? "",
      skills: selectedBlog?.skills?.join(", ") ?? "",
      published: selectedBlog?.published ?? false,
      publishedAt: selectedBlog?.publishedAt
        ? selectedBlog.publishedAt.slice(0, 16)
        : "",
    });
  }, [isOpen, selectedBlog, reset]);

  const normalizeArray = (value?: string) => {
    if (!value) return [];

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const buildPayload = async (data: BlogForm) => {
    let coverImageKey = selectedBlog?.coverImageKey || "";

    const file = data.coverImageFile?.[0];

    if (file) {
      coverImageKey = await storageService.uploadBlogImage(file);
    }

    const payload: any = {
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      content: data.content,
      coverImageKey,
      skills: normalizeArray(data.skills),
      published: !!data.published,
    };

    if (data.published) {
      payload.publishedAt = data.publishedAt
        ? new Date(data.publishedAt).toISOString()
        : new Date().toISOString();
    }

    return {
      payload,
      newImageUploaded: !!file,
      oldImageKey: selectedBlog?.coverImageKey || "",
    };
  };

  const onSubmit = async (data: BlogForm) => {
    const { payload, newImageUploaded, oldImageKey } = await buildPayload(data);

    if (selectedBlog) {
      updateBlog(
        {
          id: selectedBlog.id,
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

    createBlog(payload, {
      onSuccess: onClose,
    });
  };

  const handleDelete = () => {
    if (!selectedBlog) return;

    deleteBlog(selectedBlog.id, {
      onSuccess: async () => {
        if (selectedBlog.coverImageKey) {
          await storageService.removeFile(selectedBlog.coverImageKey);
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
        style={{
          background: "#fff",
          padding: "20px",
          width: "650px",
          maxWidth: "90%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <h2>{selectedBlog ? "Editar blog" : "Crear blog"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Título</label>
            <input type="text" {...register("title", { required: true })} />
          </div>

          <div>
            <label>Slug</label>
            <input type="text" {...register("slug", { required: true })} />
          </div>

          <div>
            <label>Descripción corta</label>
            <textarea {...register("shortDescription", { required: true })} />
          </div>

          <div>
            <label>Contenido</label>
            <textarea rows={8} {...register("content", { required: true })} />
          </div>

          <div>
            <label>Imagen de portada</label>
            <input type="file" accept="image/*" {...register("coverImageFile")} />
          </div>

          {selectedBlog?.coverImageKey && (
            <small>Imagen actual: {selectedBlog.coverImageKey}</small>
          )}

          <div>
            <label>Skills separadas por coma</label>
            <input type="text" {...register("skills")} />
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

          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <button type="submit" disabled={isCreating || isUpdating}>
              {selectedBlog
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

            {selectedBlog && (
              <button type="button" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};