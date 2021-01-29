const productsData = require('../config/products.json');
const Model = require('./Model');

class Cube extends Model {
    constructor(id, name, description, imageUrl, level) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.level = level;
    }

    static getAll() {
        return productsData;
    }

    static getOne(id) {
        return productsData.find(x => x.id == id);
    }
}

module.exports = Cube;