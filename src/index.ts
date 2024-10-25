require('dotenv').config();
import App from "./app";
import { PORT } from "./config/db.config";

const app = new App();
app.listen(<number>(<unknown>PORT));