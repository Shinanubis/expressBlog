const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'expressBlog';

const options = {useNewUrlParser: true, useUnifiedTopology: true};



// Use connect method to connect to the server
MongoClient.connect(url, options, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  db.createCollection("articles", function(err, res) {
    if (err) throw err;
    console.log("Collection articles created!");
  });
  db.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection users created!");
    client.close();
  });
});
