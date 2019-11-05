const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());

const PORT = process.env.PORT || 6002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

const order = require('./order');

app.use('/order', order);

app.listen(PORT, () => { 
	console.log('Server is running on PORT:', PORT);
});
