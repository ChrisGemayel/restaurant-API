const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());

const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

const shoppingCart = require('./shoppingCart');

app.use('/shoppingCart', shoppingCart);

app.listen(PORT, () => { 
	console.log('Server is running on PORT:', PORT);
});
