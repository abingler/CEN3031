
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , database = require('./routes/database')
  , http = require('http')
  , path = require('path') 
  , mongoose = require('mongoose')
  , mongo = require('mongodb')
  , schema = require('./schemas/suggestions');

var app = express();



//var db = Mongoose.createConnection('mongodb://todouser:todopassword@localhost/tododb'); //This is the old connection to local host

mongoose.connect('mongodb://todouser:todopassword@ds045031.mongolab.com:45031/tododb');
db = mongoose.createConnection('mongodb://todouser:todopassword@ds045031.mongolab.com:45031/tododb'); 

var TodoSchema = require('./models/Todo.js').TodoSchema;
var Todo = db.model('todos', TodoSchema);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

        
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



/*app.get('/suggestions', function(req, res){
  mongoose.model('suggestionCollection2').find(function(err, keywords){
  res.send(suggestions);
  });
});
*/


app.get('/', routes.index(Todo));
app.get('/*.html', routes.index(Todo));
app.get('/users', user.list);
app.get('/todos.json', routes.get(Todo));

app.put('/todo/:id.json', routes.update(Todo));

app.post('/todo.json', routes.addTodo(Todo));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



//Database Stuff
app.post('/push/:keywords/:suggestion/:instructionLink/:platform/:game', database.push);
//app.get('/pushSuggestions', database.pushSuggestions);
app.get('/removeSuggestions', database.removeSuggestions);
app.get('/addSuggestions', database.addSuggestions);
app.get('/getSuggestions', database.getSuggestions);
app.post('/search', database.searchSuggestions);

