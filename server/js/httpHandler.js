const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

let randomCommandGenerator = function(){
  const swimCommands = ['up', 'down', 'left', 'right'];
  let randomIndex = Math.floor(Math.random() * swimCommands.length );
  return swimCommands[randomIndex];
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    /* console.log('outside / switch');
    if (req.url === '/'){
      console.log('inside switch');
    } */
    switch (req.url) {
      case '/':
        console.log('inside switch')
        res.writeHead(200, headers);
        // res.write(randomCommandGenerator());
        res.end(randomCommandGenerator());
        break;
      case '/index':
        console.log('inside switch index.html')
        res.writeHead(200, headers); // {'Content-Type': 'application/json'}
        res.end('Welcome to Home Page!');
        break;
    }

  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    // res.write('options');
    res.end();
  }
  next();
};

// res.writeHead(200, headers);
// res.end();
// next(); // invoke next() at the end of a request to help with testing!

// if (req.url === '/index.html') {
//   res.writeHead(200, headers); // {'Content-Type': 'application/json'}
//   res.end('Welcome to Home Page!');
// } else {
//   res.writeHead(200, headers);
//   res.write(randomCommandGenerator());
//   res.end();

// console.log('outside / switch');
//     if (req.url === '/'){
//       console.log('inside switch');
//     }
// }