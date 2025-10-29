import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import tailwindcss from "@tailwindcss/postcss";
import path from "node:path";
import { pluginHtmlMinifierTerser } from "rsbuild-plugin-html-minifier-terser";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginHtmlMinifierTerser({
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeTagWhitespace: true,
      sortAttributes: true,
      sortClassName: true,
      html5: true,
    }),
  ],
  html: {
    favicon: "./src/assets/icon.ico",
    title: "Community Standard",
    meta: {
      viewport:
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    },
    tags: [
      {
        tag: "meta",
        attrs: {
          property: "og:title",
          content: "Community Standard",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:image",
          content:
            "https://res.cloudinary.com/dppdtq0df/image/upload/v1705144092/head_lkdnjp.png",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:type",
          content: "website",
        },
      },
    ],
  },
  performance: {
    buildCache: true,
    printFileSize: true,
    removeConsole: true,
    removeMomentLocale: true,
  },
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [tailwindcss],
      },
    },
  },
  source: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
