import { a } from "@aws-amplify/backend";

export const Project = a
  .model({
    title: a.string().required(),
    slug: a.string().required(),
    shortDescription: a.string().required(),
    imageKey: a.string(),
    demoUrl: a.url(),
    repoUrl: a.url(),
    skills: a.string().array(),
    featured: a.boolean().default(false),
    published: a.boolean().default(false),
    publishedAt: a.datetime(),
    type: a.enum(["PROFESSIONAL", "ACADEMIC"]),
    priority: a.integer().default(0),
    adminEmail: a.string(),
  })
  .secondaryIndexes((index) => [
    index("slug").queryField("listProjectBySlug"),
  ])
  .authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    allow.authenticated().to(["create", "update", "delete", "read"]),
  ]);