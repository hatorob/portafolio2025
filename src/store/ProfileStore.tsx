import { create } from "zustand";
import { persist } from "zustand/middleware";

type MediaSocial = {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  facebook?: string;
  instagram?: string;
};

type ProfileData = {
  cv?: string;
  mediaSocial?: MediaSocial;
};

interface ProfileState {
  profile: ProfileData | null;
  setProfile: (profile: ProfileData) => void;
  clearProfile: () => void;
}

export const ProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,

      setProfile: (profile) => {
        set({ profile });
      },

      clearProfile: () => {
        set({ profile: null });
      },
    }),
    {
      name: "profile-storage",
    }
  )
);