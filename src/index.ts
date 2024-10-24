import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";
import AuthRoutes from "./routes/AuthRoutes";

const app: Application = express();

connectDB();

app.use(express.json());

// Enable CORS for all routes
app.use(cors({
  origin: "*",
}));

// Default
app.get("/api", (req: Request, res: Response) => {
  res.status(201).json({ message: "Welcome to Auth ts" });
});

// User Route
app.use("/api/auth", AuthRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (): void => console.log(`Server is running on ${PORT}`));

// require("dotenv").config();

// import { env } from './config/global';
// import * as express from "express";
// import Container from 'typedi';
// import * as swaggerUi from "swagger-ui-express";

// import { AppDataSource } from "./config/app.datasource";

// const swaggerDocument = require('./swagger.json');

// import { config } from 'dotenv';
// import { Server } from './server';
// import { errorHandler } from "./config/error.handler";
// import { ProductController } from './api/components/products/product.controller';
// import helmet from 'helmet';
// import cors = require('cors');
// import { DB_USERNAME } from './config/db.config';



//  const app: express.Application = new Server().app;

//  app.use(express.json({ limit: '50mb' }));
//  app.use(express.urlencoded({ limit: '50mb' }))
//  app.use(helmet())
//  app.use(cors())
//  app.use(express.static('server'))

//   console.log(env.DB_USERNAME)
//   AppDataSource.initialize()
//   .then(()=>{
//       console.log("DB Now Running")
//   })
//   .catch(err => {
//       console.log(err)
//   })

//   const productController = Container.get(ProductController);
//     app.get('/products/:id', (req, res, next) => productController.getProductById(req, res, next));
//     app.put('/products/:id', (req, res, next) => productController.updateProduct(req, res, next));
//     app.delete('/products/:id', (req, res, next) => productController.deleteProduct(req, res, next));
//     app.get('/products/:code', (req, res, next) => productController.getProductByCode(req, res, next));
//     app.post('/products', (req, res, next) => productController.createProduct(req, res, next));
//     app.get('/products', (req, res, next) => productController.getProductListing(req, res, next));

   
//     // Global Error Handler
//     app.use(errorHandler);

//         app.use(
//         '/api-docs',
//         swaggerUi.serve,
//         swaggerUi.setup(swaggerDocument)
//     );

//     // Starting the server
//     const PORT = env.NODE_PORT;
//     app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     });


    