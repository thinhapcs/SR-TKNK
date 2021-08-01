const container = require("../Container");
const express = require("express");
const config = require("../../config.json");
const path = require("path");

class Server {
  constructor({ router }) {
    this.app = express();
    this.app.use(router);
    this.PORT = 8080;
  }

  start() {
    const server = this.app.listen(this.PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
    server.timeout = config.Server.TIMEOUT;
  }
}

module.exports = Server;
