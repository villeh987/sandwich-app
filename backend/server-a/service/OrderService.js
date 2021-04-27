'use strict';
var OrderModel = require('../models/order');


/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/


exports.addOrder = function (order) {
  return new Promise(function (resolve, reject) {
    resolve(order)
  });
}



/*exports.addOrder = function(order) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "sandwichId" : 6,
  "id" : 0,
  "status" : "ordered"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
 */

/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function (orderId) {
  return new Promise(function (resolve, reject) {
    OrderModel.findOne({
      id: orderId
    }).select({ id: 1, sandwichId: 1, status: 1, _id: 0 }).lean().exec(function (err, documents) {
      console.log("-----------------------getOrderById------------------------");
      console.log(JSON.stringify(documents, null, 2));
      console.log("-----------------------getOrderById------------------------");
      //return res.end(JSON.stringify(users));
      var orders = {}
      orders['application/json'] = JSON.stringify(documents)
      if (Object.keys(orders).length > 0) {
        resolve(orders[Object.keys(orders)[0]]);
      } else {
        resolve();
      }
    })
  });
}


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function () {
  return new Promise(function (resolve, reject) {
    OrderModel.find().select({ id: 1, sandwichId: 1, status: 1, _id: 0 }).lean().exec(function (err, documents) {
      console.log("-----------------------getOrders------------------------");
      console.log(JSON.stringify(documents, null, 2));
      console.log("-----------------------getOrders------------------------");
      //return res.end(JSON.stringify(users));
      var orders = {}
      orders['application/json'] = JSON.stringify(documents)
      if (Object.keys(orders).length > 0) {
        resolve(orders[Object.keys(orders)[0]]);
      } else {
        resolve();
      }
    })
  });
}

