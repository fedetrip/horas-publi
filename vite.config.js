import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/horas-publi/", // Reemplaza 'nombre-del-repositorio' con el nombre de tu repositorio
});
