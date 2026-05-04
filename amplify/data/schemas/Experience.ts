import { a } from "@aws-amplify/backend";

export const Experience = a
  .model({
    company: a.string().required(),
    companyDescription: a.string(),
    role: a.string().required(),
    area: a.string(),
    responsibilities: a.string().array(),
    skills: a.string().array(),
    dateInit: a.date().required(),
    dateEnd: a.date(),
    current: a.boolean().default(false),
  })
  .authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    allow.groups(["Admin"]).to(["create", "update", "delete", "read"]),
  ]);