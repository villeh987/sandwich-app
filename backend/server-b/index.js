'use strict';

// Server b implementation

//const sendTask = require('./rabbit-utils/sendTask.js')
const receiveTask = require('./rabbit-utils/receiveTask.js')

console.log("Running!")

receiveTask.getTask('rapid-runner-rabbit', 'received-orders');
//sendTask.addTask('rapid-runner-rabbit', 'completed-orders', 'order');



/*
// Test code that loops forever
function logEvery2Seconds(i) {
    setTimeout(() => {
        console.log('Infinite Loop Test n:', i);
        logEvery2Seconds(++i);
    }, 2000)
}

logEvery2Seconds(0);

let i = 0;
setInterval(() => {
    console.log('Infinite Loop Test interval n:', i++);
}, 2000)

*/