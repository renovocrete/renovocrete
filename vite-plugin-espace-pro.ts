import fs from "fs";
import type { IncomingMessage, ServerResponse } from "http";
import path from "path";
import type { Plugin, PreviewServer, ViteDevServer } from "vite";

const HTML_FILE = path.resolve(__dirname, "public/espace-pro/index.html");

function isEspaceProAlias(url?: string) {
  if (!url) return false;
  const pathname = url.split("?")[0];
  return pathname === "/espace-pro" || pathname === "/espace-pro/";
}

function serveEspaceProHtml() {
  return (req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => {
    if (!isEspaceProAlias(req.url)) {
      next();
      return;
    }
    try {
      const html = fs.readFileSync(HTML_FILE);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.end(html);
    } catch (error) {
      next(error);
    }
  };
}

function attach(server: ViteDevServer | PreviewServer) {
  server.middlewares.use(serveEspaceProHtml());
}

/** Serves `public/espace-pro/index.html` at `/espace-pro` without SPA fallback. */
export function espaceProHtml(): Plugin {
  return {
    name: "espace-pro-html",
    configureServer(server) {
      attach(server);
    },
    configurePreviewServer(server) {
      attach(server);
    },
  };
}
