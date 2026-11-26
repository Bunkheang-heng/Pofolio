import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { askSealion } from "./server/sealion.js";

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function servePortfolioPages(server) {
  server.middlewares.use((req, res, next) => {
    const pathname = req.url?.split("?")[0];
    if (pathname === "/trading" || pathname === "/trading/") {
      req.url = req.url.replace(/^\/trading(?:\/|\?|$)/, "/trading/index.html");
      next();
    } else if (pathname === "/resume" || pathname === "/resume/") {
      req.url = req.url.replace(/^\/resume(?:\/|\?|$)/, "/resume/index.html");
      next();
    } else {
      next();
    }
  });
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (env.SEALION_API_KEY) process.env.SEALION_API_KEY = env.SEALION_API_KEY;
  if (env.SEALION_MODEL) process.env.SEALION_MODEL = env.SEALION_MODEL;

  return {
    build: {
      rollupOptions: {
        input: {
          software: fileURLToPath(new URL("./index.html", import.meta.url)),
          trading: fileURLToPath(new URL("./trading/index.html", import.meta.url)),
          resume: fileURLToPath(new URL("./resume/index.html", import.meta.url)),
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "portfolio-pages",
        configureServer: servePortfolioPages,
        configurePreviewServer: servePortfolioPages,
      },
      {
        name: "sealion-dev",
        configureServer(server) {
          server.middlewares.use("/api/chat", async (req, res, next) => {
            if (req.method !== "POST") {
              next();
              return;
            }
            try {
              const body = await readJson(req);
              const reply = await askSealion(body.messages, req.headers["x-forwarded-for"]);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ reply }));
            } catch (error) {
              res.statusCode = error.status || 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: error.message || "SEA-LION could not answer." }));
            }
          });
        },
      },
    ],
  };
});
