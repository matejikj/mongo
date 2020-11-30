const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const socket = require('socket.io')
const cors = require('cors')
const keys = require('./config/keys')
const order = require('./model/order')
const user = require('./model/user')
const expedition = require('./model/expedition')

/*
  INITIALIZE SECTION
*/

const app = new express()
app.use(bodyParser.json())

app.use(cors())

const monCon = mongoose.connect(keys.mongoURI);
mongoose.connection.on('error',()=>{
  console.log("Error in database connection")
})
mongoose.connection.once('open',function(){
  console.log("DB connection established")
})

/*
  ORDER CONTROLLER
*/

app.get('/order', async (req,res) => {
  let result = await order.find()
  res.send(result);
})

app.post('/order', async (req,res) => {
  order.create(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

app.put('/order', async (req,res) => {
  order.findOneAndUpdate(
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

app.put('/order/process', async (req,res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    req.body.item.IsInProccess = true
    req.body.item.SortNr = req.body.nr
    req.body.IsInProccess = false
    await order.findOneAndUpdate(
      {
        _id: req.body.item._id
      },
      req.body.item,
      {
        session
      }
    );  
    await session.commitTransaction()
    session.endSession()
    io.emit('orderUpdated', req.body.item);
    res.send('Success')
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    console.log(err)
    res.send('Error')
  }
})

app.put('/order/unprocess', async (req,res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await order.updateMany(
      {
        "SortNr": { $gt: req.body.SortNr},
        "Department": req.body.Department,
        "IsInProccess": true
      },
      {
        $inc: { "SortNr" : -1}
      },
      {
        session
      }
    )
    req.body.IsInProccess = false
    await order.findOneAndUpdate(
      {
        _id: req.body._id
      },
      req.body,
      {
        session
      }
    );  
    await session.commitTransaction()
    session.endSession()
    io.emit('orderUnprocessed', req.body);
    res.send('Success')
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    console.log(err)
    res.send('Error')
  }
})

app.put('/order/moveDown', async (req,res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await order.updateMany(
      {
        $and: [
          { "SortNr": { $gt: req.body.old }},
          { "SortNr": { $lte: req.body.new }},
          { "Department": req.body.item.Department },
          { "IsInProccess": true }
        ]
      },
      {
        $inc: { "SortNr" : -1}
      },
      {
        session
      }
    )
    req.body.item.SortNr = req.body.new
    await order.findOneAndUpdate(
      {
        _id: req.body.item._id
      },
      req.body.item,
      {
        session
      }
    );
    await session.commitTransaction()
    session.endSession()
    console.log('AAAAAAAAAAAA')
    io.emit('orderMovedDown', req.body);
    res.send('Success')
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    console.log(err)
    res.send('Error')
  }
})

app.put('/order/moveUp', async (req,res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await order.updateMany(
      {
        $and: [
          { "SortNr": { $gt: req.body.old }},
          { "SortNr": { $lte: req.body.new }},
          { "Department": req.body.item.Department },
          { "IsInProccess": true }
        ]
      },
      {
        $inc: { "SortNr" : -1}
      },
      {
        session
      }
    )
    req.body.item.SortNr = req.body.new
    await order.findOneAndUpdate(
      {
        _id: req.body.item._id
      },
      req.body.item,
      {
        session
      }
    );
    await session.commitTransaction()
    session.endSession()
    io.emit('orderUnprocessed', req.body);
    res.send('Success')
  } catch (err) {
    await session.abortTransaction()
    session.endSession()
    console.log(err)
    res.send('Error')
  }
})

app.delete('/order/:orderId', async (req,res) => {
  console.log(req.params.orderId)
  order.deleteOne({ _id: req.params.orderId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'task successfully deleted',
     _id: req.params.orderId
    });
  });
})

/*
  USER CONTROLLER
*/

app.get('/user', async (req,res) => {
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
  EXPEDITION CONTROLLER
*/

app.get('/expedition', async (req,res) => {
  let result = await expedition.find()
  res.send(result);
})

app.post('/expedition', async (req,res) => {
  expedition.create(req.body, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

app.put('/expedition', async (req,res) => {
  expedition.findOneAndUpdate(
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

app.delete('/expedition/:expeditionId', async (req,res) => {
  console.log(req.params.expeditionId)
  expedition.deleteOne({ _id: req.params.expeditionId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'task successfully deleted',
     _id: req.params.expeditionId
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
  ORDER CHANGESTREAM
*/

const orderChangeStream = order.watch();

orderChangeStream.on('change', async (change) => {
  // console.log(change)
  switch (change.operationType) {
    case 'insert':
      order.findById(change.documentKey._id, (err, task) => {
        if (err) res.send(err);
        console.log('orderAdded')
        io.emit('orderAdded', task);
      });
      break;
    case 'update':
      order.findById(change.documentKey._id, (err, task) => {
        if (err) res.send(err);
        console.log('orderUpdated')
        // io.emit('orderUpdated', task);
      });
      break;
    case 'delete':
      console.log('orderDeleted')
      io.emit('orderDeleted', change);
      break;
  }
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
      break;
    case 'update':
      user.findById(change.documentKey._id, (err, task) => {
        if (err) res.send(err);
        console.log('userUpdated')
        io.emit('userUpdated', task);
      });
      break;
    case 'delete':
      console.log('userDeleted')
      io.emit('userDeleted', change);
      break;
  }
});

/*
  EXPEDITION CHANGESTREAM
*/

const expeditionChangeStream = expedition.watch();

expeditionChangeStream.on('change', async (change) => {
  switch (change.operationType) {
    case 'insert':
      expedition.findById(change.documentKey._id, (err, task) => {
        if (err) res.send(err);
        console.log('expeditionAdded')
        io.emit('expeditionAdded', task);
      });
      break;
    case 'update':
      expedition.findById(change.documentKey._id, (err, task) => {
        if (err) res.send(err);
        console.log('expeditionUpdated')
        io.emit('expeditionUpdated', task);
      });
      break;
    case 'delete':
      console.log('expeditionDeleted')
      io.emit('expeditionDeleted', change);
      break;
  }
});

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
  // socket.on("wood", async function(val){
  //   // let response = await new message(val).save()
  //   // socket.emit("wood",val)
  // })
})
