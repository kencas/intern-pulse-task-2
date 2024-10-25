import express, { Application, Request, Response, NextFunction } from "express";
import { IRoute } from "./api/base/route";
import { ProductRoute } from "./api/components/products/product.route";
import { errorHandler } from "./config/error.handler";
import { logger } from "./config/logger";
import { AppDataSource } from "./config/app.datasource";
import { env } from "./config/global";
import { notFound } from "./middlewares/ErrorMiddleware";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes";
import ProductRoutes from "./routes/ProductRoutes";

class App {
    private app: Application;

    private apiVersion = '/api';
    private routes: Record<string, IRoute> = {
      products: new ProductRoute()
    };
  
    constructor() {
      this.app = express();
      
    //   this.initMiddlewares();
    //   this.initRoutes();
    //   this.initErrorHandlers();
  
      // Enable CORS for all routes
        this.app.use(cors({
            origin: "*",
        }));
        
        // Default
        this.app.get("/api", (req: Request, res: Response) => {
            res.status(201).json({ message: "Welcome to Auth ts" });
        });
        
        // User Route
        this.app.use("/api/auth", AuthRoutes);
        this.app.use("/api/product", AuthRoutes);

        //this.initRoutes();
        
        // Middleware
        this.app.use(notFound);
        this.app.use(errorHandler);
    }
  
    private initRoutes() {
      
      Object.entries(this.routes).forEach(([url, route]) => {
        this.app.use(`${this.apiVersion}/${url}`, route.initRoutes());
      });

      this.app.get('/', (req: Request, res: Response) => {
        res.status(200).json({ message: 'WELCOME' });
      });
  

    }
  
    private initMiddlewares() {
      
  
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(express.json());
  
    }
  
    private initErrorHandlers() {
      this.app.use(errorHandler);
      this.app.use('*', (req: Request, res: Response) => {
        res.status(404).json({ msg: 'Route not found' });
      });
    }

  
    public listen(port: number) {

        console.log(env.DB_PASSWORD)
        AppDataSource.initialize()
        .then(()=>{
            console.log("DB Now Running")
        })
        .catch(err => {
            console.log(err)
        })
      
      const server = this.app;

      server.listen(port, () => {
        logger.info(`running on port ${port}`);
      });
    }
  
    public instance() {
      return this.app;
    }
  }
  
  export default App;