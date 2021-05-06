const mongoose = require('mongoose');
const { Schema } = mongoose;
const products = require('../data/productData.js');
console.log(products);

const ProductSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  image: String,
  price: Number,
  material: String,
  brand: String,
  inStock: Boolean,
  fastDelivery: Boolean,
  rating: Number,
  discount: Number,
  offer: String,
  level: String,
  category: String
});

const Product = mongoose.model('Product',ProductSchema);

const initialiseProducts = async () => {
  try{
    products.forEach(async (product) => {
      const newProduct = await Product(product);
      const saveProduct = await newProduct.save()
    })
  } catch(error){
    console.log(error);
  }
}

module.exports = { Product, initialiseProducts}