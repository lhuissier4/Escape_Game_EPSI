// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "https://escapegameepsiapi-lhuissiers-projects.vercel.app",
                changeOrigin: true,
                secure: false,

            },
        },
    },
});