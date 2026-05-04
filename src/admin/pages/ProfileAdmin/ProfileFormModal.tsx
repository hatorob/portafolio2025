import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateProfile } from "../../../hooks/profiles/useCreateProfile";
import { useUpdateProfile } from "../../../hooks/profiles/useUpdateProfile";
import { useDeleteProfile } from "../../../hooks/profiles/useDeleteProfile";
import { storageService } from "../../../services/storage.service";

type ProfileForm = {
  fullName: string;
  role: string;
  bio?: string;
  avatarKey?: string;
  avatarFile?: FileList;
  email?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  facebook?: string;
  instagram?: string;
  location?: string;
  skills?: string;
  cv?: FileList;
};

type Props = {
  isOpen: boolean;
  selectedProfile: any | null;
  onClose: () => void;
};

export const ProfileFormModal = ({
  isOpen,
  selectedProfile,
  onClose,
}: Props) => {
  const { mutate: createProfile, isPending: isCreating } = useCreateProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutate: deleteProfile, isPending: isDeleting } = useDeleteProfile();

  const { register, handleSubmit, reset } = useForm<ProfileForm>();

  useEffect(() => {
    if (!isOpen) return;

    reset({
      fullName: selectedProfile?.fullName ?? "",
      role: selectedProfile?.role ?? "",
      bio: selectedProfile?.bio ?? "",
      avatarKey: selectedProfile?.avatarKey ?? "",
      email: selectedProfile?.email ?? "",
      github: selectedProfile?.mediaSocial?.github ?? "",
      linkedin: selectedProfile?.mediaSocial?.linkedin ?? "",
      portfolio: selectedProfile?.mediaSocial?.portfolio ?? "",
      facebook: selectedProfile?.mediaSocial?.facebook ?? "",
      instagram: selectedProfile?.mediaSocial?.instagram ?? "",
      location: selectedProfile?.location ?? "",
      skills: selectedProfile?.skills?.join(", ") ?? "",
      cv: selectedProfile?.cv ?? "",
    });
  }, [isOpen, selectedProfile, reset]);

  const normalizeArray = (value?: string) => {
    if (!value) return [];

    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const buildPayload = async (data: ProfileForm) => {
    let avatarKey = selectedProfile?.avatarKey || "";
    let cvKey = selectedProfile?.cv || "";

    const file = data.avatarFile?.[0];
    const cvFile = data.cv?.[0]

    if (file) {
      avatarKey = await storageService.uploadProfileImage(file);
    }
    
    if (cvFile) {
      cvKey  = await storageService.uploadProfileImage(cvFile);
    }



    const payload = {
      fullName: data.fullName,
      role: data.role,
      bio: data.bio || "",
      avatarKey,
      photo: avatarKey,
      email: data.email || "",
      location: data.location || "",
      skills: normalizeArray(data.skills),
      cv: cvKey,
      mediaSocial: JSON.stringify({
            github: data.github || "",
            linkedin: data.linkedin || "",
            portfolio: data.portfolio || "",
            facebook: data.facebook || "",
            instagram: data.instagram || "",
        }),
    };

    return {
      payload,
      newImageUploaded: !!file,
      oldImageKey: selectedProfile?.avatarKey || "",
    };
  };

  const onSubmit = async (data: ProfileForm) => {
    const { payload, newImageUploaded, oldImageKey } = await buildPayload(data);

    if (selectedProfile) {
      updateProfile(
        {
          id: selectedProfile.id,
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

    createProfile(payload, {
      onSuccess: onClose,
    });
  };

  const handleDelete = () => {
    if (!selectedProfile) return;

    deleteProfile(selectedProfile.id, {
      onSuccess: async () => {
        if (selectedProfile.avatarKey) {
          await storageService.removeFile(selectedProfile.avatarKey);
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
        color: "#000",
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
        <h2>{selectedProfile ? "Editar perfil" : "Crear perfil"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form">
                <div className="form-items form-fields">
                    <div>
                        <label>Nombre completo</label>
                        <input type="text" {...register("fullName", { required: true })} />
                    </div>

                    <div>
                        <label>Rol</label>
                        <input type="text" {...register("role", { required: true })} />
                    </div>

                    <div>
                        <label>Foto / Avatar</label>
                        <input type="file" accept="image/*" {...register("avatarFile")} />
                    </div>
                    {selectedProfile?.avatarKey && (
                        <small>Imagen actual: {selectedProfile.avatarKey}</small>
                    )}

                    <div>
                        <label>Email</label>
                        <input type="email" {...register("email")} />
                    </div>

                    <div>
                        <label>Ubicación</label>
                        <input type="text" {...register("location")} />
                    </div>

                    <div>
                        <label>Skills separadas por coma</label>
                        <input type="text" {...register("skills")} />
                    </div>

                    <div>
                        <label>CV File</label>
                        <input type="file" accept="application/pdf" {...register("cv")} />
                    </div>

                    <hr />

                    <h3>Redes sociales</h3>

                    <div>
                        <label>GitHub</label>
                        <input type="url" {...register("github")} />
                    </div>

                    <div>
                        <label>LinkedIn</label>
                        <input type="url" {...register("linkedin")} />
                    </div>

                    <div>
                        <label>Portfolio</label>
                        <input type="url" {...register("portfolio")} />
                    </div>

                    <div>
                        <label>Facebook</label>
                        <input type="url" {...register("facebook")} />
                    </div>

                    <div>
                        <label>Instagram</label>
                        <input type="url" {...register("instagram")} />
                    </div>

                </div>
                
                <div className="form-fields-txt">
                    <div>
                        <label>Bio</label>
                        <textarea rows={5} {...register("bio")} />
                    </div>
                </div>





                <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                    <button type="submit" disabled={isCreating || isUpdating}>
                    {selectedProfile
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

                    {selectedProfile && (
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