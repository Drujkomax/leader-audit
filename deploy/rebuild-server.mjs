// Сервис пересборки сайта на VPS (заменяет Vercel Deploy Hook).
// POST /rebuild → npm ci (при необходимости) → npm run build → атомарная
// подмена dist-live, которую отдаёт nginx. Билды сериализуются; повторный
// запрос во время сборки ставит ОДИН отложенный билд в очередь.
import http from "node:http";
import { execSync } from "node:child_process";
import fs from "node:fs";

const PORT = process.env.PORT || 9000;
const APP = "/app";

let building = false;
let queued = false;

function run(cmd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { cwd: APP, stdio: "inherit" });
}

function build() {
  building = true;
  try {
    if (!fs.existsSync(`${APP}/node_modules/.bin/vite`)) run("npm ci");
    run("npm run build");
    // Подмена почти атомарна: готовим копию рядом и меняем каталоги двумя mv.
    run("rm -rf dist-live.new && cp -a dist dist-live.new");
    run("rm -rf dist-live.old && { [ -d dist-live ] && mv dist-live dist-live.old || true; }");
    run("mv dist-live.new dist-live && rm -rf dist-live.old");
    console.log(`rebuild done at ${new Date().toISOString()}`);
  } catch (e) {
    console.error(`rebuild FAILED: ${e.message}`);
  } finally {
    building = false;
    if (queued) {
      queued = false;
      setTimeout(build, 1000);
    }
  }
}

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/rebuild") {
      if (building) {
        queued = true;
        res.writeHead(202);
        return res.end('{"queued":true}');
      }
      setTimeout(build, 10);
      res.writeHead(200);
      return res.end('{"started":true}');
    }
    if (req.url === "/health") {
      res.writeHead(200);
      return res.end(`{"ok":true,"building":${building}}`);
    }
    res.writeHead(404);
    res.end();
  })
  .listen(PORT, () => console.log(`rebuild server on :${PORT}`));
