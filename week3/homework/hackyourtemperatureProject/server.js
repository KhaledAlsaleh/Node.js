
const express = require('express');
const exphbs  = require('express-handlebars');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = require('./sources/keys.json').API_KEY;


// Handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false})); // handle form submit [url encoded data] 

app.get('/', (req,res) => {
  res.render('index',{ header : 'Welcome To My Weather App'});
});


// Create post request from GUI
app.post('/weather',(req,res) => {
  // Make a request for a user with a given ID and city name
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&APPID=${API_KEY}&units=metric`)
    .then(function (response) {
      // handle success
      res.status(200).render('index',{header : 'Welcome To My Weather App', 
                                      cityTemp : `The Temperature In : ${req.body.cityName}, Is : ${response.data.main.temp} °C!`,
                                      feelsLikeTemp : `Feels Like : ${response.data.main.feels_like} °C!`,
                                      weatherDescription : `Weather Description : ${response.data.weather[0].description}.`,
                                      windSpeed : `Wind Speed : ${response.data.wind.speed} Meter/Sec.`,
                                      countryName : `Country Name : ${response.data.sys.country}.`});
    })
    .catch(function (error) {
      // handle error
      res.status(404).render('index',{header : 'Welcome To My Weather App',
                                      cityTemp: "City is not found!",
                                      feelsLikeTemp : ``,
                                      weatherDescription : ``,
                                      windSpeed : ``,
                                      countryName : ``});
      if(req.body.cityName == ''){
          res.status(400);
      }
    });
});


app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));



 