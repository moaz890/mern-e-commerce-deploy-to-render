require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const authRoutes = require('./api/routes/auth-routes');
const adminProductsRoutes = require("./api/routes/admin/products")
const shopProductsRoutes = require("./api/routes/shop/products")
const shopCartRoutes = require("./api/routes/shop/cart")
const shopAddressRoutes = require("./api/routes/shop/address");
const orderRoutes = require("./api/routes/shop/order");
const adminOrderRoutes = require("./api/routes/admin/order");
const searchRoutes = require("./api/routes/shop/search");
const reviewRoutes = require("./api/routes/shop/review");
const adminFeaturesRoutes = require("./api/routes/admin/feature")

mongoose.connect("mongodb+srv://mozagazzer:lUnOMMaY3GU8SGTj@cluster0.blmry.mongodb.net/")
    .then(() =>  console.log('connected to database'))
    .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://mern-e-commerce-deploy-to-render-gdat.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Cache-Control, X-Requested-With, Expires, Pragma");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
})

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use('/api/auth', authRoutes);
app.use('/api/admin/order', adminOrderRoutes);
app.use('/api/admin/products', adminProductsRoutes);
app.use('/api/admin/features', adminFeaturesRoutes);

app.use('/api/shop/products', shopProductsRoutes);
app.use('/api/shop/cart', shopCartRoutes);
app.use('/api/shop/address', shopAddressRoutes);
app.use('/api/shop/order', orderRoutes);
app.use('/api/shop/search', searchRoutes);
app.use('/api/shop/review', reviewRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


