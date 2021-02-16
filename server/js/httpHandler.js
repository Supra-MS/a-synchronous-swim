const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
// module.exports.backgroundImageFile = path.join('.', 'background.jpg');
module.exports.backgroundImageFile = path.join(__dirname, '../spec/water-lg.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
  console.log('Message Queue in handler file: ', messageQueue);
  // messageQueue.enqueue(randomCommandGenerator());
};

let randomCommandGenerator = function () {
  const swimCommands = ['up', 'down', 'left', 'right'];
  const randomIndex = Math.floor(Math.random() * swimCommands.length);
  return swimCommands[randomIndex];
}

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {

    switch (req.url) {
      case ('/'):
        // if (messageQueue !== null) {
          const responseString = messageQueue.dequeue();
          // messageQueue.enqueue(randomCommandGenerator());
          res.writeHead(200, headers);
          // res.write(responseString);
          res.end(responseString);
          next();
          break;
        // }

      case '/index.html':
        res.writeHead(200, headers); // {'Content-Type': 'application/json'}
        res.end('Welcome to Home page');
        next();
        break;

      case '/randomCommands':
        res.writeHead(200, headers);
        res.write(randomCommandGenerator());
        res.end();
        next();
        break;

      case '/background.jpg':
        console.log('---->out', module.exports.backgroundImageFile)
        fs.readFile(module.exports.backgroundImageFile, (error, data) => {
          console.log('---->in', module.exports.backgroundImageFile)
          if (error) {
            // throw error;
            console.log('Inside Error: ', error);
            res.writeHead(404, headers);
            // res.end('Image not found');

          } else {
            res.writeHead(200, headers);
            res.write(data, 'binary');
            // res.end('Image found');
          }
          res.end();
          next();

        });

        break;
    }

  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
   /*  var writeImageStream = fs.createWriteStream(this.backgroundImageFile);
      req.on('data', chunk => {
        console.log("overwriting file");
        writeImageStream.write(chunk);
      });
      res.writeHead(201, headers);
      res.end();
      next(); */

    var fileData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(fileData);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        res.writeHead(err ? 400 : 201,
          Object.assign({
            'Content-type': 'image/jpg'
          }, headers));
        res.end();
        next();
      });
    });
  }

  /* if (req.method === 'POST') {
    switch (req.url) {
      case '/background.jpg':
        let fileData = Buffer.alloc(0);

        req.on('data', (chunk) => {
          fileData = Buffer.concat([fileData, chunk]);
        })
        // console.log('File data: ', fileData);
        req.on('end', () => {
          var file = multipart.getFile(fileData);
          fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
            res.writeHead(err ? 400 : 201,
              Object.assign({
                'Content-type': 'image/jpg'
              }, headers));
            res.end();
            next();
          });
        });
        break;
    }
  } */

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    // res.write('options');
    res.end();
    next();
  }

};

/*
// Using if statement [working]
if (req.url === '/') {
      if (messageQueue !== null) {
        const responseString = messageQueue.dequeue();
        messageQueue.enqueue(randomCommandGenerator());
        res.writeHead(200, headers);
        // res.write(responseString);
        res.end(responseString);
        // next();
      }
    } else if (req.url === '/index.html') {
      res.writeHead(200, headers); // {'Content-Type': 'application/json'}
      res.end('Welcome to Home page');
      // next();
    } else if (req.url === '/randomCommands') {
      res.writeHead(200, headers);
      res.write(randomCommandGenerator());
      res.end();
      // next();
    } else if (req.url === '/background.jpg') {

      fs.readFile(module.exports.backgroundImageFile, (error, data) => {
        if (error) {
          // throw error;
          console.log('Inside Error: ', error);
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, {'Content-Type': 'image/jpeg'} , headers);
          res.write(data, 'binary');
        }
          res.end();
          next();

      });
    }

res.writeHead(200, headers);
res.end();
next(); // invoke next() at the end of a request to help with testing!
res.write(`inside random ${randomCommandGenerator()}`);
 */