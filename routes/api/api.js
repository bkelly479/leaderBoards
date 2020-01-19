var express = require('express');
var router = express.Router();
var secured = require('./../../lib/middleware/secured.js');
var multer = require('multer');

var upload = multer();


const mongo = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

function newConnection(){
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if(err){
      console.log(err);
      return
    }

    const db = client.db('leaderBoards');

    return(db, client);
  });
}



router.get('/newUser', secured(), function(req, res, next){
  const { _raw, _json, ...userProfile } = req.user;

  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if(err){
      console.log(err);
      return
    }

    const db = client.db('leaderBoards');

    const collection = db.collection('users');

    collection.insertOne({userID: userProfile.id, userData: userProfile }, (err, result) =>{
      if(err){
        console.log(err);
      }else{
        console.log('data has been inserted');
      }

    });

    client.close();
  });
  res.send(userProfile);

})

router.get('/checkUser', secured(), function(req, res, next){
  const { _raw, _json, ...userProfile } = req.user;

  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if(err){
      console.log(err);
      return
    }

    const db = client.db('leaderBoards');

    const collection = db.collection('users');

    collection.find({userID: userProfile.id}).toArray((err, items) => {
      if(err){
        console.log(err);
      }else{
        if(items.length){
          res.send(true);
        }else{
          res.send(false);
        }
      }
    });


    client.close();
  });
})

router.get('/getAllUsers', secured(), function(req, res, next){
  const { _raw, _json, ...userProfile } = req.user;


  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if(err){
      console.log(err);
      return
    }

    const db = client.db('leaderBoards');

    const collection = db.collection('users');



    collection.find().toArray((err, items) => {
      if(err){
        console.log(err);
      }else{

        res.send(items);
      }
    });


    client.close();
  });
})

router.post('/newBoard', function(req, res, next){

  var boardUsers = req.body['boardUsers[]'];
  var usersList = [];

  for(var i = 0; i < boardUsers.length; i++){
    var userWithData = {
      userID: boardUsers[i],
      userScore: 0
    }

    usersList.push(userWithData);
  }

  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if(err){
      console.log(err);
      return
    }

    const db = client.db('leaderBoards');

    const collection = db.collection('boards');


    collection.insertOne({boardName: req.body.boardName, boardPurpose: req.body.boardPurpose, boardUsers: usersList, boardTask: req.body.boardTask, boardIsPublic: req.body.boardPublic}, (err, result) =>{
      if(err){
        console.log(err);
      }else{
        console.log(usersList);
        console.log('new board data has been inserted');
      }

    });


    client.close();
  });

  res.send('success');
})

router.get('/getUserBoards', secured(), function(req, res, next){
  const { _raw, _json, ...userProfile } = req.user;

  //console.log(req.user.id);


  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if(err){
      console.log(err);
      return
    }

    const db = client.db('leaderBoards');

    const collection = db.collection('boards');

    collection.find({boardUsers: {$elemMatch:  {userID: req.user.id}}}).toArray(function(err, documents) {
        if(err){
          console.log(err);
        }else{
          console.log(documents);
          res.send(documents);
        }
      })

    client.close();
  });

})


module.exports = router;
