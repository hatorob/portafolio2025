import { useState } from "react";
import { ProjectFormModal } from "./ProjectFormModal";
import { useStorageUrl } from "../../../hooks/storage/useStorageUrl";
import { useProjects } from "../../../hooks/projects/useProjects";

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
  const imageUrl = useStorageUrl(project.imageKey);

  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={project.title}
          style={{ width: "100%", height: "80px", objectFit: "cover" }}
        />
      )}
      <h3>{project.title}</h3>

      <small>
        Slug: {project.slug} | {project.published ? "Publicado" : "Borrador"} |{" "}
        {project.featured ? "Destacado" : "Normal"}
      </small>
      
      <small>
        Priority: {project.priority} | {project.type}
      </small>
    </div>
  );
};

export const ProjectAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const { data: projects = [], isLoading, error } = useProjects();

  const sortedProjects = [...projects].sort((a: any, b: any) => {
    return (b.priority ?? 0) - (a.priority ?? 0);
  });

  const openCreateModal = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error cargando proyectos</p>;

  return (
    <div>
      <h1>Proyectos</h1>

      <button onClick={openCreateModal}>Crear proyecto</button>

      <hr />

      {sortedProjects.length === 0 && <p>No hay proyectos creados.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "2rem"
        }}
      >
        {sortedProjects.map((project: any) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => openEditModal(project)}
          />
        ))}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        selectedProject={selectedProject}
        onClose={closeModal}
      />
    </div>
  );
};