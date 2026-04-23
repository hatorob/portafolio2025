import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useExperiences } from "../../../hooks/experiences/useExperiences";
import { useCreateExperience } from "../../../hooks/experiences/useCreateExperience";
import { useUpdateExperience } from "../../../hooks/experiences/useUpdateExperience";
import { useDeleteExperience } from "../../../hooks/experiences/useDeleteExperience";

type ExperienceForm = {
  company: string;
  companyDescription?: string;
  role: string;
  area?: string;
  responsibilities?: string;
  skills?: string;
  dateInit: string;
  dateEnd?: string;
  current?: boolean;
};

export const ExperiencesAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);

  const { data: experiences = [], isLoading, error } = useExperiences();
  const { mutate: createExperience, isPending: isCreating } = useCreateExperience();
  const { mutate: updateExperience, isPending: isUpdating } = useUpdateExperience();
  const { mutate: deleteExperience, isPending: isDeleting } = useDeleteExperience();

  const { register, handleSubmit, reset } = useForm<ExperienceForm>();

  const openCreateModal = () => {
    setSelectedExperience(null);
    reset({
      company: "",
      companyDescription: "",
      role: "",
      area: "",
      responsibilities: "",
      skills: "",
      dateInit: "",
      dateEnd: "",
      current: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (experience: any) => {
    setSelectedExperience(experience);

    reset({
      company: experience.company ?? "",
      companyDescription: experience.companyDescription ?? "",
      role: experience.role ?? "",
      area: experience.area ?? "",
      responsibilities: experience.responsibilities?.join(", ") ?? "",
      skills: experience.skills?.join(", ") ?? "",
      dateInit: experience.dateInit ?? "",
      dateEnd: experience.dateEnd ?? "",
      current: experience.current ?? false,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  const normalizeArray = (value?: string) => {
    if (!value) return [];
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const onSubmit = (data: ExperienceForm) => {
    const payload = {
      company: data.company,
      companyDescription: data.companyDescription || "",
      role: data.role,
      area: data.area || "",
      responsibilities: normalizeArray(data.responsibilities),
      skills: normalizeArray(data.skills),
      dateInit: data.dateInit,
      dateEnd: data.current ? null : data.dateEnd || null,
      current: !!data.current,
    };

    if (selectedExperience) {
      updateExperience(
        {
          id: selectedExperience.id,
          payload,
        },
        {
          onSuccess: closeModal,
        }
      );
      return;
    }

    createExperience(payload, {
      onSuccess: closeModal,
    });
  };

  const handleDelete = () => {
    if (!selectedExperience) return;

    deleteExperience(selectedExperience.id, {
      onSuccess: closeModal,
    });
  };

  if (isLoading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error cargando experiencias</p>;

  return (
    <div>
      <h1>Experiencias laborales</h1>

      <button onClick={openCreateModal}>Crear experiencia</button>

      <hr />

      <h2>Lista de experiencias</h2>

      {experiences.length === 0 && <p>No hay experiencias creadas.</p>}

      <div style={{ color: "white"}}>
        {experiences.map((experience: any) => (
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
              {experience.dateInit} -{" "}
              {experience.current ? "Actualidad" : experience.dateEnd}
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
              width: "500px",
              maxWidth: "90%",
            }}
          >
            <h2>{selectedExperience ? "Editar experiencia" : "Crear experiencia"}</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label>Empresa</label>
                <input type="text" {...register("company", { required: true })} />
              </div>

              <div>
                <label>Descripción Empresa</label>
                <textarea {...register("companyDescription")} />
              </div>

              <div>
                <label>Rol</label>
                <input type="text" {...register("role", { required: true })} />
              </div>

              <div>
                <label>Área</label>
                <input type="text" {...register("area")} />
              </div>

              <div>
                <label>Responsabilidades separadas por coma</label>
                <textarea {...register("responsibilities")} />
              </div>

              <div>
                <label>Skills separadas por coma</label>
                <input type="text" {...register("skills")} />
              </div>

              <div>
                <label>Fecha de inicio</label>
                <input type="date" {...register("dateInit", { required: true })} />
              </div>

              <div>
                <label>Fecha final</label>
                <input type="date" {...register("dateEnd")} />
              </div>

              <div>
                <label>
                  <input type="checkbox" {...register("current")} />
                  Trabajo actual
                </label>
              </div>

              <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                <button type="submit" disabled={isCreating || isUpdating}>
                  {selectedExperience
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

                {selectedExperience && (
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