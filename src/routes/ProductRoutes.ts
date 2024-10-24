import express from "express";
import { login, register, getAll } from "../controllers/AuthController";
import Container from "typedi";
import { ProductController } from "../api/components/products/product.controller";

const router = express.Router();

const controller = Container.get(ProductController);

router.route("/").get(controller.getProductListing).post(controller.createProduct);

export default router;
