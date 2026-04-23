import { a } from "@aws-amplify/backend";

export const Blog = a
  .model({
    title: a.string().required(),
    slug: a.string().required(),
    shortDescription: a.string().required(),
    content: a.string().required(),
    coverImageKey: a.string(),
    skills: a.string().array(),
    published: a.boolean().default(false),
    publishedAt: a.datetime(),
  })
  .secondaryIndexes((index) => [
    index("slug").queryField("listBlogBySlug"),
  ])
  .authorization((allow) => [
    allow.publicApiKey().to(["read"]),
    allow.authenticated().to(["create", "update", "delete", "read"]),
  ]);