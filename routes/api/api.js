var express = require('express');
var router = express.Router();
var secured = require('./../../lib/middleware/secured.js');


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

  console.log(userProfile)

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

    collection.insertOne({userData: userProfile, boards: 'none'}, (err, result) =>{
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

    collection.find({userData: userProfile}).toArray((err, items) => {
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


module.exports = router;
