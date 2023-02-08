/// <reference types="vitest" />
// https://vitejs.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      //@ts-ignore
      beforeWriteFile: (filePath, content) => (!filePath.includes("index") ? false : content),
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/tests/config.tsx",
  },
  build: {
    lib: {
      entry: "src/index.ts",
      name: "data-table-react",
      fileName: "data-table-react",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
