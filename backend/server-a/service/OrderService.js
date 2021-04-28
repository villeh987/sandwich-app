'use strict';
var Order = require('../models/order');
var CounterModel = require('../models/counter');

/**
 * Add an order for an sandwich
 *
 * order Order place an order for a sandwich
 * returns Order
 **/
exports.addOrder = function (order) {
  return new Promise(function (resolve, reject) {
    // create the query for increasing counter by one and fetching the digit for the ID
    var query = {},
      update = { _id: "order", $inc: { counter: 1 } },
      options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Increases counter variable by 1 in the CounterModel and returns the value and which is the new order id
    CounterModel.findOneAndUpdate(query, update, options, function (error, result) {
      if (error) return;

      // set the new ID from the counter
      const NEW_ORDER_ID = result.counter
      order.data.id = NEW_ORDER_ID

      // construct object with the order data
      const orderData = {
        id: order.data.id,
        sandwichId: order.data.sandwichId,
        status: order.data.status,
      }
      // Create a order document with the data and put it in the Order collection 
      Order.create(orderData)
      resolve(order)
    });
  })
}


/**
 * Find an order by its ID
 * IDs must be positive integers
 *
 * orderId Long ID of the order that needs to be fetched
 * returns Order
 **/
exports.getOrderById = function (orderId) {
  return new Promise(function (resolve, reject) {
    var orders = {}
    // fetches the order from the db with only the necessary fields
    Order.findOne({
      id: orderId
    }).select({ id: 1, sandwichId: 1, status: 1, _id: 0 }).lean().exec(function (err, documents) {
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
    var orders = {}
    // fetches all the orders from the db with only the necessary fields
    Order.find().select({ id: 1, sandwichId: 1, status: 1, _id: 0 }).lean().exec(function (err, documents) {
      orders['application/json'] = JSON.stringify(documents)
      if (Object.keys(orders).length > 0) {
        resolve(orders[Object.keys(orders)[0]]);
      } else {
        resolve();
      }
    })
  });
}

