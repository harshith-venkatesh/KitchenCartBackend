const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./db/db');
const { initialiseProducts } = require('./models/product.model.js');
const  productsRouter = require('./routes/products.router.js');
const cartRouter = require('./routes/cart.router.js');
const wishListRouter = require('./routes/wishList.router.js');
const {pageNotFoundHandler} = require('./middlewares/pageNotFoundHandler.js');
const {errorHandler} = require('./middlewares/errorHandler.js')
const app = express();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

connectDB();
//initialiseProducts();

app.get('/',(req,res)=> res.send('Welcome to Kitchen Cart'))

app.use('/products',productsRouter);
app.use('/cart',cartRouter);
app.use('/wishlist',wishListRouter);

app.use(pageNotFoundHandler);
app.use(errorHandler);
app.listen(PORT,()=> console.log(`The App started in ${PORT}`))