import { Router } from "express";

export abstract class IRoute<T> {
	readonly name: string;
	readonly router: Router;
	readonly controller: T;

	abstract initRoutes(): Router;

	constructor() {
		this.router = Router();
	  }
}