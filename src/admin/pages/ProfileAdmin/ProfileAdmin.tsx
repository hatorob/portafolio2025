import { useState } from "react";
import { useProfiles } from "../../../hooks/profiles/useProfiles";
import { ProfileFormModal } from "./ProfileFormModal";
import { useStorageUrl } from "../../../hooks/storage/useStorageUrl";

const ProfileCard = ({ profile, onClick }: { profile: any; onClick: () => void }) => {
  const avatarUrl = useStorageUrl(profile.avatarKey);

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
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt={profile.fullName}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      )}

      <h3>{profile.fullName}</h3>
      <p>{profile.role}</p>
      <p>{profile.email}</p>
      <p>{profile.location}</p>
    </div>
  );
};

const ProfileAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  const { data: profiles = [], isLoading, error } = useProfiles();

  const openCreateModal = () => {
    setSelectedProfile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (profile: any) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProfile(null);
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error cargando perfil</p>;

  return (
    <div>
      <h1>Perfil profesional</h1>

      {profiles.length === 0 && (
        <button onClick={openCreateModal}>Crear perfil</button>
      )}

      <hr />

      {profiles.length === 0 && <p>No hay perfil creado.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "2rem",
        }}
      >
        {profiles.map((profile: any) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onClick={() => openEditModal(profile)}
          />
        ))}
      </div>

      <ProfileFormModal
        isOpen={isModalOpen}
        selectedProfile={selectedProfile}
        onClose={closeModal}
      />
    </div>
  );
};

export default ProfileAdmin;