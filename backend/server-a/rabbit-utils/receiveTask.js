#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

var amqp = require('amqplib');
var OrderModel = require('../models/order');

module.exports.getTask = function (rabbitHost, queueName) {
  amqp.connect('amqp://' + rabbitHost).then(function (conn) {
    process.once('SIGINT', function () { conn.close(); });
    return conn.createChannel().then(function (ch) {
      var ok = ch.assertQueue(queueName, { durable: true });
      ok = ok.then(function () { ch.prefetch(1); });
      ok = ok.then(function () {
        ch.consume(queueName, doWork, { noAck: false });
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        console.log(" [x] Received '%s'", body);
        var content = JSON.parse(msg.content.toString())
        var secs = body.split('.').length - 1;
        //console.log(" [x] Task takes %d seconds", secs);
        OrderModel.findOneAndUpdate(
          { id: content.data.id },
          { $set: { status: "ready" } },
          { new: true, upsert: true, useFindAndModify: false }, function (err, doc) {
            if (err) { throw err; }
            else {
              console.log("------------------------------------------------------");
              console.log("status updated to 'ready'");
              console.log(doc);
              console.log("------------------------------------------------------");

            }
          });
        ch.ack(msg);
      }
    });
  }).catch(console.warn);
}
