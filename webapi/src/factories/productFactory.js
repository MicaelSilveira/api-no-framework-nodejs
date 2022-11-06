const productRepository = require("../repositories/productRepository");
const productService = require("../services/productService");
const { join } = require("path");

const fileName = join(__dirname, "../../database", "data.json");

const generateInstance = () => {
  const repository = new productRepository({ file: fileName });
  return new productService({heroRepository: repository});
};

module.exports = generateInstance;
