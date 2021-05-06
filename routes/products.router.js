const express = require('express');
const {Product} = require('../models/product.model.js');
const {extend} = require('lodash');
const router = express.Router();

router.route('/')
.get(async(req,res)=> {
  try{
    const products = await Product.find();
    res.json({success: true,products})
  } catch(error){
    res.status(500).json({success: false, message: 'Products Listing failed'});
  }
})


router.route('/:id')
.get(async(req,res)=> {
  try{
  const { id } = req.params;
  const product = await Product.findById(id);
  if(!product){
    res.status(400).json({success:false,message: "Product not found"})
  }
  product._v = undefined;
    res.status(200).json({success:true,product});
  } catch(error){
    res.status(500).json({success: false,message: "Error while getting Product by Id"})
  }
})

module.exports = router;