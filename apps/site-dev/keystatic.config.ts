import {
  config,
  collection,
  fields,
  LocalConfig,
  GitHubConfig,
} from "@keystatic/core";

const IS_VERCEL_BUILD =
  typeof process.env.NEXT_PUBLIC_GIT_REPO_OWNER === "string" &&
  process.env.NEXT_PUBLIC_GIT_REPO_OWNER !== "";

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  IS_VERCEL_BUILD
    ? {
        kind: "github",
        pathPrefix: "apps/site-dev",
        repo: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          owner: process.env.NEXT_PUBLIC_GIT_REPO_OWNER!,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          name: process.env.NEXT_PUBLIC_GIT_REPO_SLUG!,
        },
      }
    : { kind: "local" };

export default config({
  storage,
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});
