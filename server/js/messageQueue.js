const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
  console.log('Messages Array enqueue: ', messages);
};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  const firstElement = messages.shift();
  console.log('Messages after dequeue: ', messages);
  return firstElement;
};