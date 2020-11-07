const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const keys = require('./mongoConfig');

global.Model = require('./models');
const routes = require('./routes');

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  }
);

// const port = process.env.PORT || 8081;
const port = 8081;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
var server = app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);

let io = socket(server);

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
  socket.on("wood", async function(wood){
    wood.created = new Date()
    let response = await new message(wood).save()
    socket.emit("wood",wood)
  })
})