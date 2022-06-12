const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const { createTable } = require("../app/http/controllers/baseController")

module.exports = class Application {
  constructor() {
    this.setupExpress();
    this.setConfig();
    this.setRouters();
    this.setTable();
  }

  setupExpress() {
    const server = http.createServer(app);
    server.listen(config.port, () =>
      console.log(`Listening on port ${config.port}`)
    );
  }

  setConfig() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }

  setRouters() {
    app.use(require("app/routes/api"));
  }

  setTable() {
    createTable()
  }
};
