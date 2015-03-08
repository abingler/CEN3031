
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path') 
  , mongoose = require('mongoose')
  , mongo = require('mongodb');

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

/*//Make our db accessible to our router (Andrew B)
app.use(function(req,res,next){
    req.db = db;
    next():
}
*/
        
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index(Todo));
app.get('/users', user.list);
app.get('/todos.json', routes.get(Todo));

app.put('/todo/:id.json', routes.update(Todo));

app.post('/todo.json', routes.addTodo(Todo));

//TEST
app.get('/suggestions', routes.getSuggestions);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
