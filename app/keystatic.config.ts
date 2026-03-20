import { config, collection, fields } from "@keystatic/core"

export default config({
  storage: { kind: "local" },
  collections: {
    blog: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "src/content/blog/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Facebook Ads", value: "Facebook Ads" },
            { label: "Google Ads", value: "Google Ads" },
            { label: "TikTok Ads", value: "TikTok Ads" },
            { label: "Agency Accounts", value: "Agency Accounts" },
          ],
          defaultValue: "Facebook Ads",
        }),
        description: fields.text({ label: "Description", multiline: true }),
        author: fields.text({ label: "Author", defaultValue: "GoAds Team" }),
        authorAvatar: fields.text({
          label: "Author Avatar",
          defaultValue: "/avatars/goads-team.webp",
        }),
        date: fields.text({ label: "Date" }),
        readTime: fields.text({ label: "Read Time" }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    docs: collection({
      label: "Docs Articles",
      slugField: "title",
      path: "src/content/docs/*/",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        navSlug: fields.text({ label: "Nav Slug (URL path)" }),
        description: fields.text({ label: "Description", multiline: true }),
        lastUpdated: fields.text({ label: "Last Updated" }),
        tab: fields.select({
          label: "Tab",
          options: [
            { label: "Getting Started", value: "getting-started" },
            { label: "Meta / Facebook", value: "meta" },
            { label: "Google Ads", value: "google" },
            { label: "TikTok Ads", value: "tiktok" },
            { label: "Billing & Support", value: "billing" },
          ],
          defaultValue: "getting-started",
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
})
