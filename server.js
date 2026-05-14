/**
 * Plain Node.js HTTP server (no Express).
 * - Serves /public statically with proper MIME types.
 * - Falls back to /index.html for unknown routes (SPA-style).
 * - Accepts POST /api/contact and logs the message (replace with email/DB in prod).
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = path.join(__dirname, "public");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

function safeJoin(root, target) {
  // Prevent path traversal
  const resolved = path.normalize(path.join(root, target));
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  res.end(body);
}

function serveStatic(req, res, parsedUrl) {
  let pathname = decodeURIComponent(parsedUrl.pathname);
  if (pathname === "/") pathname = "/index.html";

  let filePath = safeJoin(ROOT, pathname);
  if (!filePath) return send(res, 400, "Bad request");

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // SPA-style fallback to index.html for unknown HTML routes
      if (path.extname(pathname) === "" || path.extname(pathname) === ".html") {
        filePath = path.join(ROOT, "index.html");
      } else {
        return send(res, 404, "Not found");
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": type,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "X-Content-Type-Options": "nosniff",
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function readBody(req, limit = 1024 * 32) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Contact API
  if (req.method === "POST" && parsedUrl.pathname === "/api/contact") {
    try {
      const raw = await readBody(req);
      const data = raw ? JSON.parse(raw) : {};
      const name = String(data.name || "").trim().slice(0, 200);
      const email = String(data.email || "").trim().slice(0, 200);
      const message = String(data.message || "").trim().slice(0, 4000);

      if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return send(
          res,
          400,
          JSON.stringify({ ok: false, error: "Invalid payload" }),
          { "Content-Type": "application/json" },
        );
      }

      // For now: log to console. Swap for Nodemailer / DB / external API in prod.
      console.log(
        `[contact] ${new Date().toISOString()} — ${name} <${email}>: ${message}`,
      );

      return send(
        res,
        200,
        JSON.stringify({ ok: true, message: "Thanks! I'll be in touch soon." }),
        { "Content-Type": "application/json" },
      );
    } catch (err) {
      return send(
        res,
        400,
        JSON.stringify({ ok: false, error: "Bad request" }),
        { "Content-Type": "application/json" },
      );
    }
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return send(res, 405, "Method not allowed", { Allow: "GET, HEAD, POST" });
  }

  serveStatic(req, res, parsedUrl);
});

server.listen(PORT, HOST, () => {
  console.log(`\n  Portfolio running at http://localhost:${PORT}\n`);
});
