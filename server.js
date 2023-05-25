require('dotenv').config();
const db = require('./data/database');
const cors = require('cors');

const express = require('express');

// routes import
const baseRoutes = require('./routes/base.routes');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');

// middlewares
const protectRoutes = require('./middlewares/protect-routes');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Invoking routes
app.use('/api/v1', baseRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', productsRoutes);
app.use('/api/v1/orders', protectRoutes, ordersRoutes);
app.use('/api/v1/admin', protectRoutes, adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is runing on: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
