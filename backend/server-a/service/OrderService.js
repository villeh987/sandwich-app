'use strict';


/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/
exports.addOrder = function(order) {
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


/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function(orderId) {
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


/**
 * Get a list of all orders. Empty array if no orders are found.
 *
 * returns ArrayOfOrders
 **/
exports.getOrders = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [
      {
      "sandwichId" : 6,
      "id" : 0,
      "status" : "ordered"
      },
      {
      "sandwichId" : 85,
      "id" : 2,
      "status" : "recieved"
      },
      {
      "sandwichId" : 45,
      "id" : 777,
      "status" : "inQueue"
      },
      {
      "sandwichId" : 92,
      "id" : 12,
      "status" : "ready"
      },
      {
      "sandwichId" : 5,
      "id" : 443,
      "status" : "failed"
      },
      {
      "sandwichId" : 65,
      "id" : 434,
      "status" : "wrongParam"
      },
    ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

