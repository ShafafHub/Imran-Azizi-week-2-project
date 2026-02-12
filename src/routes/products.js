import {
  listProducts,
  findById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../lib/store.js";

import { parseJsonBody } from "../lib/bodyParser.js";

export async function handleProducts(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const id = url.pathname.split("/")[2];

  // GET /products
  if (req.method === "GET" && !id) {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(listProducts()));
  }

  // GET /products/:id
  if (req.method === "GET" && id) {
    const product = findById(Number(id));
    if (!product) {
      res.writeHead(404);
      return res.end("Not Found");
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(product));
  }

  // POST /products
  if (req.method === "POST") {
    try {
      const body = await parseJsonBody(req);
      if (!body.name || typeof body.price !== "number") {
        res.writeHead(400);
        return res.end("Invalid product");
      }
      const product = createProduct(body);
      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(product));
    } catch {
      res.writeHead(400);
      return res.end("Invalid JSON");
    }
  }

  // PUT /products/:id
  if (req.method === "PUT" && id) {
    const body = await parseJsonBody(req);
    const updated = updateProduct(Number(id), body);
    if (!updated) {
      res.writeHead(404);
      return res.end("Not Found");
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(updated));
  }

  // DELETE /products/:id
  if (req.method === "DELETE" && id) {
    const ok = deleteProduct(Number(id));
    if (!ok) {
      res.writeHead(404);
      return res.end("Not Found");
    }
    res.writeHead(204);
    return res.end();
  }

  res.writeHead(404);
  res.end("Not Found");
}
