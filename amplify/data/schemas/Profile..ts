import { a } from "@aws-amplify/backend";

export const Profile = a
  .model({
    fullName: a.string().required(),
    photo: a.string(),
    role: a.string().required(),
    bio: a.string(),
    avatarKey: a.string(),
    email: a.email(),
    mediaSocial: a.json(), // { github: '', linkedin: '', portfolio: '', facebook: '', instagram: ''}
    location: a.string(),
    skills: a.string().array(),
    cv: a.string()
  })
  .authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    allow.groups(["Admin"]).to(["create", "update", "delete", "read"]),
  ]);