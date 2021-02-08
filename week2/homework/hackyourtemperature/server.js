
const express = require('express');
const exphbs  = require('express-handlebars');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// Handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false})); // handle form submit [url encoded data] 

app.get('/', (req,res) => {
  res.render('index',{ header : 'Welcome To My Weather App'});
});

// // Create post request from Postman
// app.post('/weather',(req,res) => {
//   // Make sure the request is not empty
//   if(typeof req.body == "undefined" || typeof req.body.cityName == "undefined" || req.body.cityName == ""){
//     return res.status(400).send('Invalid request, please enter city name!');
//   }
//   res.status(200).end(`Your City Is ${req.body.cityName}`);
// });


// Create post request from GUI
app.post('/weather',(req,res) => {
  // Make sure the input is not empty
  if(req.body.cityName == ""){
    return res.status(400).render('index',{ header : 'Welcome To My Weather App', yourCity : 'Invalid request, please enter city name!'});
  }
  res.status(200).render('index',{ header : 'Welcome To My Weather App', yourCity : `Your City Is ${req.body.cityName}`});
  // res.redirect('/');
});

 
app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));