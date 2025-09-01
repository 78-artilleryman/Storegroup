import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // HTML 환경변수 치환 플러그인
    {
      name: "html-env",
      transformIndexHtml: {
        order: "pre",
        handler(html: string) {
          return html
            .replace(
              /%VITE_GA_MEASUREMENT_ID%/g,
              process.env.VITE_GA_MEASUREMENT_ID || ""
            )
            .replace(
              /%VITE_KAKAO_JS_KEY%/g,
              process.env.VITE_KAKAO_JS_KEY || ""
            );
        },
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  define: {
    global: "globalThis",
  },
});
