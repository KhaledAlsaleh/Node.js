
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
//app.use(express.urlencoded({extended : false})); // handle form submit [url encoded data] 

app.get('/', (req,res) => {
  res.render('index',{ header : 'Welcome To My Weather App'});
});

app.post('/weather',(req,res) => {
  //???
})


 

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));