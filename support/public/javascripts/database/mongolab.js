//start mongoDB shell with mongo --nodb


//Connect to MongoLab database
var connection = new Mongo( "ds045031.mongolab.com:45031" );

//Connect to the test database
var db = connection.getDB( "tododb" );

//Authorize this connection
db.auth( "todouser","todopassword" );

print( "> MongoLab connection and DB defined.");