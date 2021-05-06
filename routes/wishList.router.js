const express = require('express');
const {WishListItem} = require('../models/wishlist.model.js');
const router = express.Router();

router.route('/')
.get(async(req,res) => {
  try{
    const fetchWishListItems = await WishListItem.find().populate('_id');
    const wishListItems = fetchWishListItems.map(item => {
      const { _id,...doc} = item._id._doc;
      return { id: _id,...doc}
    })
    res.status(200).json({success:true,wishListItems})
  } catch(error){
    res.status(500).json({success:false,message: 'Error while getting wishlist'})
  }
})
.post(async(req,res)=> {
  try {
    const product = req.body;
    console.log({product})
    const {_id} = product;
    console.log({_id});
    const wishListItem = new WishListItem({_id:_id});
    console.log({wishListItem});
    await wishListItem.save();
    res.status(201).json(product);
  } catch(error){
    res.status(500).json({success:false,message: 'Error while updating wishlist'})
  }
})

router.delete('/:id',async(req,res)=> {
  const { id } = req.params;
  await WishListItem.findByIdAndDelete(id);
  res.status(204).json({})

})
module.exports = router