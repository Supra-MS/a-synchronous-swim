const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
// module.exports.backgroundImageFile = path.join('.', 'background.jpg');
module.exports.backgroundImageFile = path.join(__dirname, '../spec/water-lg.jpg');
console.log('line 8 --> ',path.join('.', 'background.jpg'));
console.log('line 9 --> ',path.join(__dirname, '../spec/water-lg.jpg'));

////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {

  messageQueue = queue;
  console.log('inside httpHandler ---> ',messageQueue);
  messageQueue.enqueue(randomCommandGenerator());
};

let randomCommandGenerator = function(){
  const swimCommands = ['up', 'down', 'left', 'right'];
  let randomIndex = Math.floor(Math.random() * swimCommands.length );
  return swimCommands[randomIndex];
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    switch (req.url) {
      case '/background.jpg':
          console.log('outside read ', this.backgroundImageFile);
          fs.readFile(this.backgroundImageFile, ( error, data) =>{
            console.log('inside FS read ', this.backgroundImageFile);

            if(error){
              console.log('Error: ', error);
              res.writeHead(404, headers);
              res.end(JSON.stringify(error));
            }else{
              res.writeHead(200, headers);
              res.end(data);
            }
            next();
          });
        break;

      case '/':
        if(messageQueue !== null){
          let responceString = messageQueue.dequeue();
          res.writeHead(200, headers);
          res.end(responceString);
          messageQueue.enqueue(randomCommandGenerator());
        }
        break;

      case '/randomCommand':
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
    next();
  }
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