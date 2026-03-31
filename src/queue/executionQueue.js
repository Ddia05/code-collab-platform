const { executeCode } = require("../execution/executor");

const MAX_CONCURRENT = 3;  //temporarily set to 3 -- will increase as needed 

let activeCount = 0;
const queue = [];

function processQueue() {
  if (activeCount >= MAX_CONCURRENT || queue.length === 0) return;

  const { code, resolve, onStart, onPosition } = queue.shift();

  activeCount++;

  onStart();

  executeCode(code).then((result) => {
    activeCount--;
    resolve(result);

    processQueue();
  });

  queue.forEach((item, index) => {
    item.onPosition(index + 1);
  });
}

function enqueue(code, onStart, onPosition) {
  return new Promise((resolve) => {
    queue.push({ code, resolve, onStart, onPosition });

    onPosition(queue.length);
    processQueue();
  });
}

module.exports = { enqueue };
