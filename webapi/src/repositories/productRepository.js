const { readFile, writeFile } = require("fs/promises");
class productRepository {
  constructor({ file }) {
    this.file = file;
  }
  async _currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }
  async find(itemID) {
    const all = await this._currentFileContent();
    if (!itemID) return all;
    return all.find(({ id }) => itemID === id);
  }
  async create(data) {
    if (!data) {
      return { error: "ERROR" };
    }
    const currentFile = await this._currentFileContent();
    currentFile.push(data);

    await writeFile(this.file, JSON.stringify(currentFile));

    return data.id;
  }
}

module.exports = productRepository;
