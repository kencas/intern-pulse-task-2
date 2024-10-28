"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./config/db.config");
const app = new app_1.default();
app.listen(db_config_1.PORT);
//# sourceMappingURL=index.js.map