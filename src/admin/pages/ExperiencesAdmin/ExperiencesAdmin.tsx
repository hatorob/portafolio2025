import { useState } from "react";
import { useExperiences } from "../../../hooks/experiences/useExperiences";
import { formatDateRange } from "../../../utils/formateDateRange";
import { ExperienceFormModal } from "./ExperiencesFormModal";

export const ExperiencesAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);

  const { data: experiences = [], isLoading, error } = useExperiences();

  const sortedExperiences = [...experiences].sort((a: any, b: any) => {
    if (a.current) return -1;
    if (b.current) return 1;

    const dateA = new Date(a.dateEnd || a.dateInit).getTime();
    const dateB = new Date(b.dateEnd || b.dateInit).getTime();

    return dateB - dateA;
  });

  const openCreateModal = () => {
    setSelectedExperience(null);
    setIsModalOpen(true);
  };

  const openEditModal = (experience: any) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedExperience(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error cargando experiencias</p>;

  return (
    <div>
      <h1>Experiencias laborales</h1>

      <button onClick={openCreateModal}>Crear experiencia</button>

      <hr />

      {sortedExperiences.length === 0 && <p>No hay experiencias creadas.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "2rem"
        }}
      >
        {sortedExperiences.map((experience: any) => (
          <div
            key={experience.id}
            onClick={() => openEditModal(experience)}
            style={{
              border: "1px solid #ccc",
              padding: "12px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            <h3>{experience.company}</h3>
            <p>{experience.role}</p>
            <p>{experience.area}</p>
            <small>
              {formatDateRange(experience.dateInit, experience.dateEnd)}
            </small>
          </div>
        ))}
      </div>

      <ExperienceFormModal
        isOpen={isModalOpen}
        selectedExperience={selectedExperience}
        onClose={closeModal}
      />
    </div>
  );
};