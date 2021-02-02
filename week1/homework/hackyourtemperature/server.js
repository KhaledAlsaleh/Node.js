
const express = require('express');
const exphbs  = require('express-handlebars');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req,res) => {
  res.send('<h1>Hello From Backend To Frontend!!!</h1>');
  // OR res.send('Hello From Backend To Frontend!!!');
});

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));