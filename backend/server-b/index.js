'use strict';

// Server b implementation

const receiveTask = require('./rabbit-utils/receiveTask.js')
console.log("Running!")
receiveTask.getTask('rapid-runner-rabbit', 'received-orders');
