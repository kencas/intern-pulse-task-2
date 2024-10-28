import { NextFunction, Request, Response } from "express";
import { success } from "../../util/response";

import * as asyncHandler from "express-async-handler";
import { BookManagementService } from "./book.service.impl";
import { BookDto } from "./book.dto";
const service = BookManagementService.getInstance();

// @Desc Get all users
// @Route /api/auth
// @Method GET
export const getAll = asyncHandler(async (req: Request, res: Response) => {

    
    const books = await service.getBookListing();
    success(res, 201, books, "Books listed successfully");
});

// @Desc Create Book
// @Route /api/v1/books
// @Method POST
export const createBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    try 
    {
        const data: BookDto = req.body;

        const result = await service.createBook(data);
        success(res, 201, result, "Book created successfully");
    }
    catch (err)
    {
        next(err);
    }

});

// @Desc Get all users
// @Route /api/auth
// @Method GET
export const getBookByCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const result = await service.getBookByCode(req.params.code);
        success(res, 201, result, "Book retrived successfully");
    }
    catch (err)
    {
        next(err);
    }

});


// @Desc Update Book
// @Route /api/v1/:BookId
// @Method PUT
export const updateBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data: BookDto = req.body;

    try 
    {
        const result = await service.updateBook(parseInt(req.params.id.toString()), data);
        success(res, 201, result, "Book updated successfully");
    }
    catch (err)
    {
        next(err);
    }

});

export const getBookById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const result = await service.getBookById(req.params.id);
        success(res, 200, result, "Book Listed successfully");
    }
    catch (err)
    {
        next(err);
    }

});

export const deleteBook = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const result = await service.deleteBook(parseInt(req.params.id.toString()));
        success(res, 201, result, "Book Data deleted successfully");
    }
    catch (err)
    {
        next(err);
    }

});

export const performBookOperation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const result = await service.performBookOperation(parseInt(req.params.id.toString()), req.body);
        success(res, 201, result, "Book Operaton performed successfully");
    }
    catch (err)
    {
        next(err);
    }

});