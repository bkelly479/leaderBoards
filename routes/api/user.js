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





exports.newUser = (req, res) => {
  const { _raw, _json, ...userProfile } = req.user;
  var conn = newConnection();

  conn.db.insertOne(userProfile)

  res.send(userProfile);

  conn.client.close();
}
