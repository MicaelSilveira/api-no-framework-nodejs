class productService {

  constructor({ heroRepository }) {
    this.heroRepository = heroRepository;
  }

  async find(itemID) {
    return this.heroRepository.find(itemID);
  }

  async create(date) {
    return this.heroRepository.create(date);
  }
}

module.exports = productService;
