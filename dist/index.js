"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var app_1 = require("./app");
var db_config_1 = require("./config/db.config");
var app = new app_1.default();
app.listen(db_config_1.PORT);
//# sourceMappingURL=index.js.map