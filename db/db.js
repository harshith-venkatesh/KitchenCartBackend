const mongoose = require('mongoose');

const connectDB = async () => {
  try{
    await mongoose.connect(process.env['MONGODB_URI'],
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useFindAndModify:false
    }
    )
    console.log('connected to DB successfully')
  } catch(e){
    console.log(e);
    console.log('failed to connect to DB')
  }
}

module.exports = { connectDB }