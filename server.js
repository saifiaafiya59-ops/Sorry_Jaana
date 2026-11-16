
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "public");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4"
};

http.createServer((req, res) => {
  let pathname = decodeURIComponent(
    (req.url || "/").split("?")[0]
  );

  if (pathname === "/") pathname = "/index.html";

  const file = path.resolve(root, "." + pathname);

  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end("File not found");
    }

    res.writeHead(200, {
      "Content-Type":
        types[path.extname(file)] || "application/octet-stream"
    });

    res.end(data);
  });

}).listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Love website running on port 3000");
});
