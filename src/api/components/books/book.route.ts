import { Router } from 'express';
import Container, { Service } from 'typedi';
import { IRoute } from '../../base/route';
import { BookController } from './book.controller';

@Service()
export class BookRoute extends IRoute<BookController>{
	readonly name: string = 'books';
	controller = Container.get(BookController)

	initRoutes(): Router {
		this.router
		.post('/', this.controller.createBook)
		.get('/', this.controller.getAll);

		this.router
		.get('/:id', this.controller.getBookById)
		.put('/:id', this.controller.updateBook)
		.patch('/:id', this.controller.performBookOperation)
		.delete('/:id', this.controller.deleteBook);

		return this.router;
	}
}
