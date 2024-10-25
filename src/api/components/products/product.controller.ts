import { NextFunction, Request, Response } from "express";
import { ProductManagementService } from "./product.service.impl";
import { ProductDto } from "./product.dto";
import { success } from "../../util/response";

import asyncHandler from "express-async-handler";
const service = ProductManagementService.getInstance();

// @Desc Get all users
// @Route /api/auth
// @Method GET
export const getAll = asyncHandler(async (req: Request, res: Response) => {

    
    const products = await service.getProductListing();
    console.log("Products", products)
    success(res, 201, products, "Products listed successfully");
});

// @Desc Create Product
// @Route /api/v1/products
// @Method POST
export const createProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    try 
    {
        const data: ProductDto = req.body;

        const result = await service.createProduct(data);
        success(res, 201, result, "Product created successfully");
    }
    catch (err)
    {
        next(err);
    }

});

// @Desc Get all users
// @Route /api/auth
// @Method GET
export const getProductByCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const result = await service.getProductByCode(req.params.code);
        success(res, 201, result, "Product retrived successfully");
    }
    catch (err)
    {
        next(err);
    }

});


// @Desc Update Product
// @Route /api/v1/:productId
// @Method PUT
export const updateProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: ProductDto = req.body;

    try 
    {
        const result = await service.updateProduct(parseInt(req.params.id.toString()), data);
        success(res, 201, result, "Product updated successfully");
    }
    catch (err)
    {
        next(err);
    }

});

export const getProductById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const result = await service.getProductById(req.params.id);
        success(res, 200, result, "Product Listed successfully");
    }
    catch (err)
    {
        next(err);
    }

});

export const deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const result = await service.deleteProduct(parseInt(req.params.id.toString()));
        success(res, 201, result, "Product Data deleted successfully");
    }
    catch (err)
    {
        next(err);
    }

});