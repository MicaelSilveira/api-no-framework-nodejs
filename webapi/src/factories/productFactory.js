const productRepository = require("../repositories/productRepository");
const productService = require("../services/productService");
const { join } = require("path");

const fileName = join(__dirname, "../../database", "data.json");

const generateIntance = () => {
  const repository = new productRepository({ file: fileName });
  const service = new productService({ heroRepository: repository });
  return service;
};

module.exports = generateIntance;
