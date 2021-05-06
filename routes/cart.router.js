const express = require('express');
const {CartItem} = require('../models/cart.model.js');
const router = express.Router();

router.route('/')
.get(async (req,res)=> {
  try{
    const cartItems = await CartItem.find().populate('_id')
    console.log(cartItems);
    const updatedCartItems = cartItems.map(item => {
      const{_id,...doc} = item._id._doc;
      return {_id,...doc,qty: item.qty}
    })
    res.status(200).json({success:true,cartListItems: updatedCartItems})
  } catch(error){
    res.status(500).json({success:false,message: 'Error while getting cart'})
  }
})
.post(async (req,res) => {
  try{
    const product = req.body;
    const { _id, qty } = product;
    const cartItem = new CartItem({_id:_id,qty});
    await cartItem.save();
    res.status(201).json(product);
  } catch(error){
    console.log(error);
    res.status(500).json({ success: false,message: 'Error while creating cart Item'})
  }
});

router.route('/:id').post(async (req,res)=> {
  try{
    const { qty } = req.body;
    const {id} = req.params;
    const cartItem = await CartItem.findByIdAndUpdate(id,{qty});
    res.status(201).json({success:true,qty: qty});
  } catch(error){
    res.status(500).json({ success: false,message: 'Error while updating cart Item'})
  }
})
.delete(async(req,res)=> {
  try{
    const {id} = req.params;
  await CartItem.findByIdAndDelete(id);
  res.status(204).json({})
  } catch(error){
    res.status(500).json({ success: false,message: 'Error while deleting cart Item'})
  }
})

module.exports = router;