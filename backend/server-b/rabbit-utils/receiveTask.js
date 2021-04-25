#!/usr/bin/env node
// Process tasks from the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');
const sendTask = require('./sendTask.js')


module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(new Date(), " [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        console.log(" [x] Received '%s'", body);

        var content = JSON.parse(msg.content.toString())
        content.data.status = "Ready"

        setTimeout(function() {
          console.log(new Date(), " [x] Done");
          ch.ack(msg);
          sendTask.addTask('rapid-runner-rabbit', 'completed-orders', content)
        }, 10000);
      }
    });
  }).catch(console.warn);
}
