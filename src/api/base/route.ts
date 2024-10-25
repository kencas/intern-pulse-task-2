import { Router } from "express";

export abstract class IRoute {
	readonly name: string;
	readonly router: Router;

	abstract initRoutes(): Router;

	constructor() {
		this.router = Router();
	  }
}