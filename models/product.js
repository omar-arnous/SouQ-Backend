const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.description = productData.description;
    this.price = productData.price;
    this.image = productData.image;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static findById = async (productId) => {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDB()
      .collection('products')
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error('Could not find product with provided id.');
      error.code = 404;
      throw error;
    }

    return new Product(product);
  };

  static findAll = async () => {
    const products = await db.getDB().collection('products').find().toArray();

    return products.map((productDocument) => {
      return new Product(productDocument);
    });
  };

  static findMultiple = async (ids) => {
    const productIds = ids.map((id) => {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  };

  updateImageData() {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  save = async () => {
    const productData = {
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.image,
    };

    if (this.id) {
      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db.getDB().collection('products').updateOne(
        { _id: productId },
        {
          $set: productData,
        }
      );
    } else {
      await db.getDB().collection('products').insertOne(productData);
    }
  };

  replaceImage = (newImage) => {
    this.image = newImage;
    this.updateImageData();
  };

  remove = () => {
    const productId = new mongodb.ObjectId(this.id);
    return db.getDB().collection('products').deleteOne({ _id: productId });
  };
}

module.exports = Product;
