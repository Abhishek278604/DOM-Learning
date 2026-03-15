const fs = require('fs');

console.log('1: sync');

setTimeout(() => console.log('2: setTimeout'), 0);
setImmediate(() => console.log('3: setImmediate'));

Promise.resolve().then(() => console.log('4: promise'));
process.nextTick(() => console.log('5: nextTick'));

fs.readFile(__filename, () => {
  console.log('6: I/O callback');
  setTimeout(() => console.log('7: setTimeout inside I/O'), 0);
  setImmediate(() => console.log('8: setImmediate inside I/O'));
  process.nextTick(() => console.log('9: nextTick inside I/O'));
  Promise.resolve().then(() => console.log('10: promise inside I/O'));
});

console.log('11: sync again');


// Output
// 1: sync
// 11: sync again
// 5: nextTick
// 4: promise
// 2: setTimeout
// 3: setImmediate
// 6: I/O callback
// 9: nextTick inside I/O
// 10: promise inside I/O
// 8: setImmediate inside I/O
// 7: setTimeout inside I/O