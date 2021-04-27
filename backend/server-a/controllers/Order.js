'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');
var OrderModel = require('../models/order');
var CounterModel = require('../models/counter');
var sendTask = require('../rabbit-utils/sendTask.js')
var receiveTask = require('../rabbit-utils/receiveTask.js')

module.exports.addOrder = function addOrder(req, res, next) {
  var order = req.swagger.params['order'].value;
  var query = {},
    update = { _id: "order", $inc: { counter: 1 } },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Increases counter variable by 1 in the CounterModel and returns the value and which is the new order id
  CounterModel.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) return;

    const NEW_ORDER_ID = result.counter
    order.data.id = NEW_ORDER_ID

    const orderData = {
      id: order.data.id,
      sandwichId: order.data.sandwichId,
      status: order.data.status,
    }
    OrderModel.create(orderData)

    Order.addOrder(order)
      .then(function (response) {
        utils.writeJson(res, response);
        console.log(order)
        // Let's add the order to a queue
        // Notice: "rapid-runner-rabbit" is the name of the Docker Compose service
        // Using only Docker didn't networking didn't work,
        // unless Docker's bridge network IPs, were used (172.20.0.X).
        sendTask.addTask("rapid-runner-rabbit", "received-orders", order);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  })
};

module.exports.getOrderById = function getOrderById(req, res, next) {
  var orderId = req.swagger.params['orderId'].value;


  Order.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrders = function getOrders(req, res, next) {
  /*   OrderModel.find().select({ id: 1, sandwichId: 1, status: 1, _id: 0 }).lean().exec(function (err, orders) {
      console.log("-----------------------getOrders------------------------");
      console.log(JSON.stringify(orders, null, 2));
      console.log("-----------------------getOrders------------------------");
      //return res.end(JSON.stringify(users));
    }) */
  Order.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
