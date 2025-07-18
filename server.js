// server.js  – CommonJS, compatible Node.js sans config supplémentaire
const http      = require("http");
const fs        = require("fs");
const path      = require("path");

// Chemins vers les fichiers
const DATA = path.join(__dirname, "data.json");
const HTML = path.join(__dirname, "index.html");
const CSS  = path.join(__dirname, "style.css");
const JS   = path.join(__dirname, "script.js");

// Utilitaires JSON
function readAnimals() {
  if (!fs.existsSync(DATA)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA, "utf8"));
  } catch {
    return [];
  }
}
function writeAnimals(list) {
  fs.writeFileSync(DATA, JSON.stringify(list, null, 2));
}

// Création du serveur

http.createServer((req, res) => {
  // POST /animals → ajout d’un animal
  if (req.method === "POST" && req.url === "/animals") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try {
        const ani  = JSON.parse(body);
        const list = readAnimals();
        list.push(ani);
        writeAnimals(list);
        res.writeHead(201, {"Content-Type":"application/json"});
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.writeHead(400).end("invalid-json");
      }
    });
    return;
  }

  // GET /animals → liste complète
  if (req.method === "GET" && req.url === "/animals") {
    res.writeHead(200, {"Content-Type":"application/json"});
    res.end(JSON.stringify(readAnimals()));
    return;
  }

  // DELETE /animals → vide tout
  if (req.method === "DELETE" && req.url === "/animals") {
    writeAnimals([]);
    res.writeHead(204).end();
    return;
  }

  // DELETE /animals/:i → supprime un seul animal
  if (req.method === "DELETE" && req.url.startsWith("/animals/")) {
    const idx = Number(req.url.split("/")[2]);
    const list = readAnimals();
    if (!isNaN(idx) && idx >= 0 && idx < list.length) {
      list.splice(idx, 1);
      writeAnimals(list);
      res.writeHead(204).end();
    } else {
      res.writeHead(404).end("not-found");
    }
    return;
  }

  // GET statiques: index.html, style.css, script.js
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.end(fs.readFileSync(HTML));
    return;
  }
  if (req.method === "GET" && req.url === "/style.css") {
    res.writeHead(200, {"Content-Type":"text/css"});
    res.end(fs.readFileSync(CSS));
    return;
  }
  if (req.method === "GET" && req.url === "/script.js") {
    res.writeHead(200, {"Content-Type":"application/javascript"});
    res.end(fs.readFileSync(JS));
    return;
  }

  // Tout le reste → 404
  res.writeHead(404).end("Not found");
})
.listen(3000, () => console.log("🚀 Serveur lancé sur http://localhost:3000"));
