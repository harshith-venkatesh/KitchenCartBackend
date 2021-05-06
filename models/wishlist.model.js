const mongoose = require('mongoose');
const {Schema} = mongoose;

const WishListSchema =  new Schema({
  _id: {type:Schema.Types.ObjectId,ref:'Product'}
})

const WishListItem = mongoose.model('WishListItem',WishListSchema);

module.exports = { WishListItem }