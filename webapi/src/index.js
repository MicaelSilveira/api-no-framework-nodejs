const http = require("http");
const DEFAULT_HEADER = { "Content-Type": "application/json" };
const PORT = 5000;

const generateIntance = require("./factories/productFactory");
const newHero = require("./entities/products");

const productService = generateIntance();

const router = {
  notFound: (req, res) => {
    res.writeHead(404, DEFAULT_HEADER);
    res.write(JSON.stringify({ error: "Pagina não encontrada" }));
    return res.end();
  },
  "/products:get": async (req, res) => {
    const { id } = req.queryString;
    const products = await productService.find(id);
    res.write(JSON.stringify({ results: products }));
    return res.end();
  },
  "/product:post": async (req, res) => {
    for await (const data of req) {
      const item = JSON.parse(data);
      const hero = new newHero(item);
      const { error, valid } = hero.isValid();
      if (!valid) {
        res.writeHead(400, DEFAULT_HEADER);
        res.write(JSON.stringify({ error: error.join(",") }));
        return res.end();
      }
      const id = await productService.create(item);
      res.writeHead(201, DEFAULT_HEADER);
      res.write(JSON.stringify({ sucess: "Created", id }));
      return res.end();
    }
  },
};

const handleError = (response) => {
  return (error) => {
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "internal server error" }));

    return response.end();
  };
};

const handle = (request, response) => {
  const { url, method } = request;
  const [first, route, id] = url.split("/");
  request.queryString = { id: isNaN(id) ? id : Number(id) };

  const key = `/${route}:${method}`.toLowerCase();

  response.writeHead(200, DEFAULT_HEADER);

  const chosen = router[key] || router.notFound;

  return chosen(request, response).catch(handleError(response));
};

http.createServer(handle).listen(PORT, () => {
  console.log("server is running");
});
