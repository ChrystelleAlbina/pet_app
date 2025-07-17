// server.js  – Node ≥ 18, aucun package externe
import { createServer } from "http";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// Fichier persistant situé à la racine du projet
const DATA = join(__dirname, "data.json");

// Utilitaires lecture/écriture JSON -----------------------------
const readAnimals = () => {
  if (!existsSync(DATA)) return [];
  try   { return JSON.parse(readFileSync(DATA, "utf8")); }
  catch { return []; }                // fichier corrompu → tableau vide
};
const writeAnimals = (list) =>
  writeFileSync(DATA, JSON.stringify(list, null, 2));

// ---------------------------------------------------------------
createServer((req, res) => {
  // ---- POST /animals : ajoute un animal dans data.json ----
  if (req.method === "POST" && req.url === "/animals") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const animal = JSON.parse(body);           // objet envoyé par le front
        const list   = readAnimals();
        list.push(animal);
        writeAnimals(list);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.writeHead(400); res.end("invalid-json");
      }
    });
    return;
  }

  // ---- GET /animals : renvoie tout le tableau ----
  if (req.method === "GET" && req.url === "/animals") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(readAnimals()));
    return;
  }

  // ---- GET / et /index.html : sert la page statique ----
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(readFileSync(join(__dirname, "index.html")));
    return;
  }

  // ---- 404 pour tout le reste ----
  res.writeHead(404); res.end("Not found");
}).listen(3000, () =>
  console.log("✅  http://localhost:3000  (data.json créé au besoin)"));
