import express from "express";
import Container from "typedi";
import {  createProduct, getAll } from "../api/components/products/product.controller";

const router = express.Router();

router.route("/").get(getAll).post(createProduct);

export default router;
