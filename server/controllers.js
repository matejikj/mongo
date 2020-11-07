const mongoose = require('mongoose');
const wood = mongoose.model('wood');

/*
CAST PRO DREVO
*/

exports.list_all_woods = (req, res) => {
  wood.find({}, (err, woods) => {
    if (err) res.send(err);
    res.json(woods);
  });
};

exports.create_a_wood = (req, res) => {
  const newWood = new wood(req.body);
  newWood.save((err, wood) => {
    if (err) res.send(err);
    res.json(wood);
  });
};

exports.update_a_wood = (req, res) => {
  wood.findOneAndUpdate(
    console.log(req.body)
    // { _id: req.params.woodId },
    // req.body,
    // { new: true },
    // (err, wood) => {
    //   if (err) res.send(err);
    //   res.json(wood);
    // }
  );
};

exports.delete_a_wood = (req, res) => {
  wood.deleteOne({ _id: req.params.woodId }, err => {
    if (err) res.send(err);
    res.json({
      message: 'wood successfully deleted',
     _id: req.params.woodId
    });
  });
};