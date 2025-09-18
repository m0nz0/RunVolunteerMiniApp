import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
    plugins: [react()],
    base: "/RunVolunteerMiniApp/", // 👈 имя репозитория GitHub Pages
    server: {
        port: 3000,
        // proxy для бэка, если нужно:
        // proxy: {
        //   "/api": { target: "http://localhost:5000", changeOrigin: true }
        // }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
