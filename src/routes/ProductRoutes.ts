import express from "express";
import Container from "typedi";
import { ProductController, getAll } from "../api/components/products/product.controller";

const router = express.Router();

const controller = new ProductController();

router.route("/").get(getAll).post(controller.createProduct);

export default router;
