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
  if(req.method === 'GET'){
    if(req.url === '/index.html'){
      res.writeHead(200, headers);
      // res.
      // res.write(randomCommandGenerator());
      res.end('Welcome to Home Page!');
    }else{
      res.writeHead(200, headers);
      res.write(randomCommandGenerator());
      res.end();
    }

  }
  if(req.method === 'OPTIONS'){
    res.writeHead(200, headers);
    // res.write('up');
    res.end();
  }
  next();
};

// res.writeHead(200, headers);
// res.end();
// next(); // invoke next() at the end of a request to help with testing!