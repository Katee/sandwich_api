var restify = require('restify');

// Simple administration authorization key
var auth_key = "ABC123";

// In-memory "database" for storing orders
var order_id_counter = 0;
var orders = {};

function get_fillings(req, res, next) {
  // Hard code the fillings into our code for now
  var fillings = {"fillings": [
    {'id': 1, 'name': 'Black Diamond Medium Cheddar'},
    {'id': 2, 'name': 'Schneider\'s Bacon'},
    {'id': 3, 'name': 'Schneider\'s Bologna'},
    {'id': 4, 'name': 'Fresh Alfalfa Sprouts'},
    {'id': 5, 'name': 'French\'s Mustard'},
    {'id': 6, 'name': 'Hellman\'s Mayo'},
    {'id': 7, 'name': 'Tomato'},
    {'id': 8, 'name': 'Kraft Smooth Peanut Butter'},
    {'id': 9, 'name': 'Nutella'}
  ]};

  res.send(fillings);
}

function post_new_order(req, res, next) {
  
  var fillings = req.params.fillings;
  // TODO: check fillings are valid
  
  // Create a new order by first grabbing a unique ID
  var id = order_id_counter;
  order_id_counter += 1;
  
  orders[id] = {
    "fillings": fillings,
    "status": "queued"
  };
  
  res.send({"id": id});
}

function get_order(req, res, next) {
  var id = req.params.id;
 
  res.send(orders[id]);
}

function get_orders(req, res, next) {
  res.send(orders);
}

function update_order_status(req, res, next) {
  var id = req.params.id;
  var status = req.params.status;

  // TODO: error on authorization fail
  // TODO: check new status is a valid status
  if(req.params.auth_key == auth_key)
  {
    orders[id]["status"] = status;
  }
  
  res.send();
}

var server = restify.createServer();
server.use(restify.bodyParser());

// fillings
server.get('/fillings', get_fillings);

// orders
server.post('/order', post_new_order);
server.get('/orders', get_orders);
server.get('/order/:id', get_order);
server.post('/order/:id/status', update_order_status);

server.listen(8181, function() {
  console.log('%s listening at %s', server.name, server.url);
});