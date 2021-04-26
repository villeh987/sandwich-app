#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');
var OrderModel = require('../models/order');

module.exports.addTask = function (rabbitHost, queueName, order) {
  amqp.connect('amqp://' + rabbitHost)
    .then(function (c) {
      c.createConfirmChannel()
        .then(function (ch) {
          ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {},
            function (err, ok) {
              if (err !== null) {
                console.warn(new Date(), 'Message nacked!');
                OrderModel.findOneAndUpdate(
                  { id: order.data.id },
                  { $set: { status: "failed" } },
                  { new: true, upsert: true, useFindAndModify: false }, function (err, doc) {
                    if (err) { throw err; }
                    else {
                      console.log("status updated to 'failed'");
                    }
                  });
              } else {
                console.log(new Date(), 'Message acked');
                OrderModel.findOneAndUpdate(
                  { id: order.data.id },
                  { $set: { status: "inQueue" } },
                  { new: true, upsert: true, useFindAndModify: false }, function (err, doc) {
                    if (err) { throw err; }
                    else {
                      console.log("------------------------------------------------------");
                      console.log("status updated to 'inQueue'");
                      console.log(doc);
                      console.log("------------------------------------------------------");
                    }
                  });
              }
            });
        });
    });
}
