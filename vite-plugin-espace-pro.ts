import type { IncomingMessage, ServerResponse } from "http";
import type { Plugin, PreviewServer, ViteDevServer } from "vite";

function isEspaceProAlias(url?: string) {
  if (!url) return false;
  const pathname = url.split("?")[0];
  return pathname === "/espace-pro" || pathname === "/espace-pro/";
}

function redirectEspacePro() {
  return (req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => {
    if (!isEspaceProAlias(req.url)) {
      next();
      return;
    }
    res.statusCode = 302;
    res.setHeader("Location", "/espace-pro/index.html");
    res.end();
  };
}

function attach(server: ViteDevServer | PreviewServer) {
  server.middlewares.use(redirectEspacePro());
}

/** Sends `/espace-pro` to the standalone HTML file so the SPA fallback cannot swallow it. */
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
