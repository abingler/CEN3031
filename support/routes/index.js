
/*
 * GET home page.
 */

exports.index = function(Todo) {
  return function(req, res) {
    Todo.find({}, function(error, todos) {
        if (req.params.length == 0) {
          res.render('auralux.html', {
            title: 'Express',
            todos : todos
          });   
        } else {
          res.render(req.params[0] + '.html', {
            title: 'Express',
            todos : todos
          });   
        }
    });
  };
};

exports.addTodo = function(Todo) {
  return function(req, res) {
    var todo = new Todo(req.body);
    todo.save(function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        res.json({ todo : todo });
      }
    });
  };
};

exports.get = function(Todo) {
  return function(req, res) {
    Todo.find({}, function(error, todos) {
      res.json({ todos : todos });
    });
  }
};

exports.update = function(Todo) {
  return function(req, res) {
    Todo.findOne({ _id : req.params.id }, function(error, todo) {
      if (error || !todo) {
        res.json({ error : error });
      } else {
        todo.done = req.body.done;
        todo.save(function(error, todo) {
          if (error || !todo) {
            res.json({ error : error });
          } else {
            res.json({ todo : todo });
          }
        });
      }
    });
  }
};
