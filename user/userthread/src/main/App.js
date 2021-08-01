// main app
class App {
  constructor({ server, database }) {
    this.server = server;
    this.database = database;
  }

  async start() {
    // Start server and connect to database
    await this.server.start();
  }
}

module.exports = App;
