const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const socket = require('socket.io')
const cors = require('cors')
const keys = require('./config/keys')
const wood = require('./model/wood')
const user = require('./model/user')

/*
  INITIALIZE SECTION
*/

const app = new express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(keys.mongoURI);
mongoose.connection.on('error',()=>{
  console.log("Error in database connection")
})
mongoose.connection.once('open',function(){
  console.log("DB connection established")
})

/*
  WOOD CONTROLLER
*/

app.get('/wood', async (req,res) => {
  let result = await wood.find()
  res.send(result);
})

app.post('/wood', async (req,res) => {
  var object = {
    name: req.body.name,
    age: req.body.age
  };

  wood.create(object, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

app.put('/wood', async (req,res) => {
  console.log(req.body.id)
  // task.findOneAndUpdate(
  //   { _id: req.params.taskId },
  //   req.body,
  //   { new: true },
  //   (err, task) => {
  //     if (err) res.send(err);
  //     res.json(task);
  //   }
  // );
})

app.delete('/wood', async (req,res) => {
  console.log(req.body.id)
  // task.deleteOne({ _id: req.body.id }, err => {
  //   if (err) res.send(err);
  //   res.json({
  //     message: 'task successfully deleted',
  //    _id: req.params.taskId
  //   });
  // });
})

/*
  USER CONTROLLER
*/

app.get('/user', async (req,res) => {
  console.log("USERS")
  let result = await user.find()
  res.send(result);
})

app.post('/user', async (req,res) => {
  user.create(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

app.put('/user', async (req,res) => {
  user.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, task) => {
      if (err) {
        res.send(err);
      } else {
        res.json(task);
      }
    }
  );
})

app.delete('/user/:userId', async (req,res) => {
  console.log(req.params.userId)
  user.deleteOne({ _id: req.params.userId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'task successfully deleted',
     _id: req.params.userId
    });
  });
})

/*
  START SERVER
*/

var server = app.listen(5000,()=>{
  console.log("Howdy, I am running at PORT 5000")
})

let io =  socket(server);

/*
  WOOD CHANGESTREAM
*/

const woodChangeStream = wood.watch();

woodChangeStream.on('change', (change) => {
  console.log(change)
  switch (change.operationType) {
    case 'insert':
      console.log('WOOD INSERT')
      break;
  }
  // console.log(change); // You could parse out the needed info and send only that data. 
  // io.emit('wood', change);
});

/*
  USERS CHANGESTREAM
*/

const userChangeStream = user.watch();

userChangeStream.on('change', async (change) => {
  switch (change.operationType) {
    case 'insert':
      user.findById(change.documentKey._id, (err, task) => {
        if (err) res.send(err);
        console.log('userAdded')
        io.emit('userAdded', task);
      });
      // const { dataInserted } = await user.findById(change.documentKey._id)
      //io.emit('userAdded', dataInserted);
      break;
    case 'update':
      user.findById(change.documentKey._id, (err, task) => {
        if (err) res.send(err);
        console.log('userUpdated')
        io.emit('userUpdated', task);
      });
      // const { data } = await user.findById(change.documentKey._id)
      // io.emit('userUpdated', data);
      break;
    case 'delete':
      console.log('userDeleted')
      io.emit('userDeleted', change);
      break;
  }
  // console.log(change); // You could parse out the needed info and send only that data. 
  // io.emit('wood', change);
});

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
  socket.on("wood", async function(val){
    // let response = await new message(val).save()
    // socket.emit("wood",val)
  })
})
