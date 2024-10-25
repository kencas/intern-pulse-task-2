import { Router } from 'express';
import Container, { Service } from 'typedi';
import { IRoute } from '../../base/route';
import { createProduct, deleteProduct, getAll, getProductByCode, getProductById, updateProduct } from './product.controller';

@Service()
export class ProductRoute extends IRoute{
	readonly name: string = 'products';


	initRoutes(): Router {
		this.router
		.post('/', createProduct)
		.get('/', getAll);

		this.router
		.get('/:id', getProductById)
		.put('/:id', updateProduct)
		.delete('/:id', deleteProduct);

		return this.router;
	}
}
