const con = require('../db-config');
const queries = require('../queries/tasks.queries');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 *///basis to utilize API's 

exports.getAllTasks = function(req, res) { //specify method in naming convention object.name = anoymous function(request, result)
  con.query(queries.ALL_TASKS, function(err, result, fields) { //can perform querys because it is open in db-config.js
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/tasks/1 == parameter = 1 (RESTful service)
exports.getTask = function(req, res) {
  con.query(queries.SINGLE_TASKS, [req.params.taskId], function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

// http://localhost:3000/tasks/1
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */

//body can insert chuncks of data
exports.createTask = function(req, res) {
  con.query(queries.INSERT_TASK, [req.body.name], function(err, result) { //Note body is not a paramter. Body is 
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.json({ message: 'Number of records inserted: ' + result.affectedRows });
  });
};
// .json is an object literal
    // .object({key: value}) **Key's value NEEDS to be a String (or Int??) *** Not a function

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
//NOTE: body and params in query.Update
exports.updateTask = function(req, res) {
  con.query(
    //column order is needed for requests
    queries.UPDATE_TASK,
    [req.body.name, req.body.status, req.params.taskId],
    function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json(data);
    }
  );
};

// http://localhost:3000/tasks/1
//only passing params (Id)
exports.deleteTask = function(req, res) {
  con.query(queries.DELETE_TASK, [req.params.taskId], function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Deleted successfully.' }); //.json(object literal) ({key: value})
  });
};