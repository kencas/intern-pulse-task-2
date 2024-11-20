import  { Application, Request, Response, NextFunction } from "express";
import * as express from "express";
import { IRoute } from "./api/base/route";
import { errorHandler } from "./config/error.handler";
import { AppDataSource } from "./config/app.datasource";
import { env } from "./config/global";
import * as cors from "cors";
import { BookRoute } from "./api/components/books/book.route";

class App {
    private app: Application;

    private apiVersion = '/api/v1';
    private routes: Record<string, IRoute<any>> = {
      books: new BookRoute()
    };
  
    constructor() {
      this.app = express();
      
      this.initMiddlewares();
      this.initRoutes();
      this.initErrorHandlers();
  
      // Enable CORS for all routes
        this.app.use(cors({
            origin: "*",
        }));
        
       
    }
  
    private initRoutes() {
      console.log("init routes")
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

        AppDataSource.initialize()
        .then(()=>{
            console.log("DB Now Running")
        })
        .catch(err => {
            console.log(err)
        })
      
      const server = this.app;

      server.listen(port, () => {
        console.log(`running on port ${port}`);
      });
    }
  
    public instance() {
      return this.app;
    }
  }
  
  export default App;