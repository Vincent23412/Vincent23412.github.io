import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// If this is a project page (e.g. /portfolio/), set base to "/portfolio/"
export default defineConfig({
  plugins: [react()],
  base: "/"
});
