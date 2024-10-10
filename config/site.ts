export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "MoveMate",
  description: "Movemate Dashboard",
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://table.sadmn.com",
  links: { github: "https://github.com/sadmann7/shadcn-table" },
};
