import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  // Get this from tina.io
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "portfolio-images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "portfolio",
        label: "Portfolio Items",
        path: "content/portfolio",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "imageSrc",
            label: "Image",
            required: true,
          },
          {
            type: "rich-text",
            name: "description",
            label: "Description",
            isBody: true,
            required: true,
          },
          {
            type: "string",
            name: "labels",
            label: "Labels/Tags",
            list: true,
            required: true,
          },
          {
            type: "number",
            name: "featurePosition",
            label: "Feature Position",
            description: "If set, this item will be featured on the homepage in this position (1, 2, 3, etc.)",
          },
        ],
      },
      {
        name: "profile",
        label: "Profile & CV Data",
        path: "content/profile",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Full Name",
            required: true,
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Information",
            fields: [
              {
                type: "string",
                name: "email",
                label: "Email",
                required: true,
              },
              {
                type: "string",
                name: "phone",
                label: "Phone",
                required: true,
              },
            ],
          },
          {
            type: "rich-text",
            name: "summary",
            label: "About/Summary",
            isBody: true,
            required: true,
          },
          {
            type: "object",
            name: "socialMedia",
            label: "Social Media Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Platform Name",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "URL",
                required: true,
              },
              {
                type: "string",
                name: "handle",
                label: "Handle/Username",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "careerHistory",
            label: "Career History",
            list: true,
            fields: [
              {
                type: "string",
                name: "role",
                label: "Job Role",
                required: true,
              },
              {
                type: "string",
                name: "company",
                label: "Company",
                required: true,
              },
              {
                type: "string",
                name: "period",
                label: "Period",
                required: true,
              },
              {
                type: "string",
                name: "responsibilities",
                label: "Responsibilities",
                list: true,
              },
            ],
          },
          {
            type: "string",
            name: "skills",
            label: "Skills",
            list: true,
            required: true,
          },
          {
            type: "string",
            name: "languages",
            label: "Languages",
            list: true,
            required: true,
          },
          {
            type: "object",
            name: "education",
            label: "Education",
            list: true,
            fields: [
              {
                type: "string",
                name: "qualification",
                label: "Qualification",
                required: true,
              },
              {
                type: "string",
                name: "institution",
                label: "Institution",
                required: true,
              },
              {
                type: "string",
                name: "year",
                label: "Year",
                required: true,
              },
              {
                type: "string",
                name: "details",
                label: "Details",
                list: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
