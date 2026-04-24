import { useState } from "react";
import { useBlogs } from "../../../hooks/blogs/useBlogs";
import { useStorageUrl } from "../../../hooks/storage/useStorageUrl";
import { BlogFormsModal } from "./BlogsFormModal";

const BlogCard = ({ blog, onClick }: { blog: any; onClick: () => void }) => {
  const imageUrl = useStorageUrl(blog.coverImageKey);

  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={blog.title}
          style={{ width: "120px", height: "80px", objectFit: "cover" }}
        />
      )}

      <h3>{blog.title}</h3>
      <p>{blog.shortDescription}</p>

      <small>
        Slug: {blog.slug} | {blog.published ? "Publicado" : "Borrador"}
      </small>
    </div>
  );
};

export const BlogsAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const { data: blogs = [], isLoading, error } = useBlogs();

  const sortedBlogs = [...blogs].sort((a: any, b: any) => {
    const dateA = new Date(a.publishedAt || a.createdAt).getTime();
    const dateB = new Date(b.publishedAt || b.createdAt).getTime();

    return dateB - dateA;
  });

  const openCreateModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const openEditModal = (blog: any) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Cargando blogs...</p>;
  if (error) return <p>Error cargando blogs</p>;

  return (
    <div>
      <h1>Blogs</h1>

      <button onClick={openCreateModal}>Crear blog</button>

      <hr />

      {sortedBlogs.length === 0 && <p>No hay blogs creados.</p>}

      <div>
        {sortedBlogs.map((blog: any) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={() => openEditModal(blog)}
          />
        ))}
      </div>

      <BlogFormsModal
        isOpen={isModalOpen}
        selectedBlog={selectedBlog}
        onClose={closeModal}
      />
    </div>
  );
};