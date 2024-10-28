import { Router } from 'express';
import Container, { Service } from 'typedi';
import { IRoute } from '../../base/route';
import { createBook, deleteBook, getAll, getBookByCode, getBookById, performBookOperation, updateBook } from './book.controller';

@Service()
export class BookRoute extends IRoute{
	readonly name: string = 'products';


	initRoutes(): Router {
		this.router
		.post('/', createBook)
		.get('/', getAll);

		this.router
		.get('/:id', getBookById)
		.put('/:id', updateBook)
		.patch('/:id', performBookOperation)
		.delete('/:id', deleteBook);

		return this.router;
	}
}
