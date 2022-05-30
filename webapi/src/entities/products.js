class Product {
  constructor({ name, category, price }) {
    this.id = Math.floor(Math.random() * 100) + Date.now();
    this.name = name;
    this.category = category;
    this.price = price;
  }
  isValid() {
    const property = Object.getOwnPropertyNames(this);
    const amountInvalid = property
      .map((i) => (!!this[i] ? null : `${i} is missing`))
      .filter((item) => !!item);
    return {
      valid: amountInvalid.length === 0,
      error: amountInvalid,
    };
  }
}
module.exports = Product;
