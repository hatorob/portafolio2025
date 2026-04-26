import { useEffect } from "react";
import { useForm } from "react-hook-form";
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

type Props = {
  isOpen: boolean;
  selectedExperience: any | null;
  onClose: () => void;
};

export const ExperienceFormModal = ({
  isOpen,
  selectedExperience,
  onClose,
}: Props) => {
  const { mutate: createExperience, isPending: isCreating } =
    useCreateExperience();
  const { mutate: updateExperience, isPending: isUpdating } =
    useUpdateExperience();
  const { mutate: deleteExperience, isPending: isDeleting } =
    useDeleteExperience();

  const { register, handleSubmit, reset } = useForm<ExperienceForm>();

  useEffect(() => {
    if (!isOpen) return;

    reset({
      company: selectedExperience?.company ?? "",
      companyDescription: selectedExperience?.companyDescription ?? "",
      role: selectedExperience?.role ?? "",
      area: selectedExperience?.area ?? "",
      responsibilities: selectedExperience?.responsibilities?.join(", ") ?? "",
      skills: selectedExperience?.skills?.join(", ") ?? "",
      dateInit: selectedExperience?.dateInit ?? "",
      dateEnd: selectedExperience?.dateEnd ?? "",
      current: selectedExperience?.current ?? false,
    });
  }, [isOpen, selectedExperience, reset]);

  const normalizeArray = (value?: string) => {
    if (!value) return [];

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const onSubmit = (data: ExperienceForm) => {
    const payload: any = {
      company: data.company,
      companyDescription: data.companyDescription || "",
      role: data.role,
      area: data.area || "",
      responsibilities: normalizeArray(data.responsibilities),
      skills: normalizeArray(data.skills),
      dateInit: data.dateInit,
      current: !!data.current,
    };

    if (!data.current && data.dateEnd) {
      payload.dateEnd = data.dateEnd;
    }

    if (selectedExperience) {
      updateExperience(
        {
          id: selectedExperience.id,
          payload,
        },
        {
          onSuccess: onClose,
        }
      );

      return;
    }

    createExperience(payload, {
      onSuccess: onClose,
    });
  };

  const handleDelete = () => {
    if (!selectedExperience) return;

    deleteExperience(selectedExperience.id, {
      onSuccess: onClose,
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
        <h2>
          {selectedExperience ? "Editar experiencia" : "Crear experiencia"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form">
            <div className="form-items form-fields">
              <div>
                <label>Empresa</label>
                <input type="text" {...register("company", { required: true })} />
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
            </div>
            <div className="form-fields-txt">
              <div>
                <label>Descripción Empresa</label>
                <textarea {...register("companyDescription")} rows={6} cols={60}/>
              </div>
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

              <button type="button" onClick={onClose}>
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
          </div>
        </form>
      </div>
    </div>
  );
};