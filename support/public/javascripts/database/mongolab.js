//start mongoDB shell with mongo --nodb


//Connect to MongoLab database
var connection = new Mongo( "ds047571.mongolab.com:47571" );

//Connect to the test database
var db = connection.getDB( "tododb" );

//Authorize this connection
db.auth( "actalexis","todopassword1" );

print( "> MongoLab connection and DB defined.");