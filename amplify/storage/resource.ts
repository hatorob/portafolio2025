import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "portfolioStorage",
  access: (allow) => ({
    "projects/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
    "blogs/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
    "profiles/*": [
      allow.guest.to(["read"]),
      allow.groups(["Admin"]).to(["read", "write", "delete"]),
    ],
  }),
});