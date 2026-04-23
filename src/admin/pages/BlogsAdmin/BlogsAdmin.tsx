import { useState } from "react";
import { useForm } from "react-hook-form";
import { useBlogs } from "../../../hooks/blogs/useBlogs";
import { useCreateBlog } from "../../../hooks/blogs/useCreateBlog";
import { useUpdateBlog } from "../../../hooks/blogs/useUpdateBlog";
import { useDeleteBlog } from "../../../hooks/blogs/useDeleteBlog";

type BlogForm = {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  coverImageKey?: string;
  skills?: string;
  published?: boolean;
  publishedAt?: string;
};

export const BlogsAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const { data: blogs = [], isLoading, error } = useBlogs();
  const { mutate: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog();

  const { register, handleSubmit, reset } = useForm<BlogForm>();

  const normalizeArray = (value?: string) => {
    if (!value) return [];
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const openCreateModal = () => {
    setSelectedBlog(null);
    reset({
      title: "",
      slug: "",
      shortDescription: "",
      content: "",
      coverImageKey: "",
      skills: "",
      published: false,
      publishedAt: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (blog: any) => {
    setSelectedBlog(blog);

    reset({
      title: blog.title ?? "",
      slug: blog.slug ?? "",
      shortDescription: blog.shortDescription ?? "",
      content: blog.content ?? "",
      coverImageKey: blog.coverImageKey ?? "",
      skills: blog.skills?.join(", ") ?? "",
      published: blog.published ?? false,
      publishedAt: blog.publishedAt
        ? blog.publishedAt.slice(0, 16)
        : "",
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const onSubmit = (data: BlogForm) => {
    const payload = {
      title: data.title,
      slug: data.slug,
      shortDescription: data.shortDescription,
      content: data.content,
      coverImageKey: data.coverImageKey || "",
      skills: normalizeArray(data.skills),
      published: !!data.published,
      publishedAt: data.published
        ? data.publishedAt || new Date().toISOString()
        : null,
    };

    if (selectedBlog) {
      updateBlog(
        {
          id: selectedBlog.id,
          payload,
        },
        {
          onSuccess: closeModal,
        }
      );
      return;
    }

    createBlog(payload, {
      onSuccess: closeModal,
    });
  };

  const handleDelete = () => {
    if (!selectedBlog) return;

    deleteBlog(selectedBlog.id, {
      onSuccess: closeModal,
    });
  };

  if (isLoading) return <p>Cargando blogs...</p>;
  if (error) return <p>Error cargando blogs</p>;

  return (
    <div>
      <h1>Blogs</h1>

      <button onClick={openCreateModal}>Crear blog</button>

      <hr />

      {blogs.length === 0 && <p>No hay blogs creados.</p>}

      <div style={{color: "white"}}>
        {blogs.map((blog: any) => (
          <div
            key={blog.id}
            onClick={() => openEditModal(blog)}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            <h3>{blog.title}</h3>
            <p>{blog.shortDescription}</p>
            <small>
              Slug: {blog.slug} |{" "}
              {blog.published ? "Publicado" : "Borrador"}
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
              color: "black"
            }}
          >
            <h2>{selectedBlog ? "Editar blog" : "Crear blog"}</h2>

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
                <label>Contenido</label>
                <textarea
                  rows={8}
                  {...register("content", { required: true })}
                />
              </div>

              <div>
                <label>Cover image key</label>
                <input type="text" {...register("coverImageKey")} />
              </div>

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

                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>

                {selectedBlog && (
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