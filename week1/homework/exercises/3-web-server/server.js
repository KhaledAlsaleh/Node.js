/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

//create a server
const server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
	res.write('Hello World!'); // Sends a response back to the client
	res.end(); // Ends the response
});

server.listen(3000, () => console.log('Server Running...')); // The server starts to listen on port 3000

//Or  For Deploy Purpose
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Server Running On Port ${PORT}...`))