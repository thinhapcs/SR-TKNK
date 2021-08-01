const mongoose = require("mongoose");


const dbURI = 'mongodb+srv://admin:admin@market.sdvm0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.set('useFindAndModify', false);

module.exports = mongoose.connection.once("open", () => {
  // eslint-disable-next-line no-console
  console.log("moongose is running");
});
