/**
 * Exercise 3: Create an HTTP web server
 */

const http = require('http');
const path = require('path');
const fs = require('fs');

//create a server
const server = http.createServer(function (req, res) {
	// YOUR CODE GOES IN HERE

	// // Read HTML File Instead Of Hello World!
	// if(req.url === '/'){
	// 	fs.readFile(path.join(__dirname,'/','index.html'), (err,content) => {
	// 			if(err) throw err;
	// 			res.writeHead(200, { 'Content-Type': 'text/html'});
	// 			res.write(content); // Sends a response back to the client
	// 			res.end(); // Ends the response
	// 			// OR :
	// 			// res.setHeader('Content-Type', 'text/html');
	// 			// res.end(content);
	// 		});
	// }

	// if(req.url === '/index.js'){
	// 	fs.readFile(path.join(__dirname,'/','index.js'), (err,content) => {
	// 			if(err) throw err;
	// 			res.writeHead(200, { 'Content-Type': 'text/javascript'});
	// 			res.write(content); // Sends a response back to the client
	// 			res.end(); // Ends the response
	// 			// OR :
	// 			// res.setHeader('Content-Type', 'text/javascript');
	// 			// res.end(content);
	// 		});
	// }


	// Build Dynamic Response Depends On The URL And The Extensions

	// Build File Path
	let filePath = path.join(__dirname,'/', req.url === '/' ? 'index.html' : req.url);

	// Extension Of File
	let extName = path.extname(filePath);

	// Initial Content Type
	let contentType = 'text/html'; // Default Value (What We Most Expect!)

	// Check The Extension & Set Content Type
	switch (extName) {
		case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break; 
	}

	// Read File
	fs.readFile(filePath,(error,content) => {
		if(error) {
			if(error.code == 'ENOENT'){
				// Page Not Found Error
				fs.readFile(path.join(__dirname,'/', 'error.html'), (err,content) => {
					res.writeHead(200, {'Content-Type': 'text/html' });
					res.end(content,'utf8');
				});
			}else{
				// Server Error [500]
				res.writeHead(500);
				res.end(`Server Error: ${error.code}`);
			}
		}else{
			// Success For Response
			res.writeHead(200, {'Content-Type': contentType});
			res.end(content,'utf8');
		}
	});
	
});

server.listen(3000, () => console.log('Server Running...')); // The server starts to listen on port 3000

//Or  For Deploy Purpose
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Server Running On Port ${PORT}...`))