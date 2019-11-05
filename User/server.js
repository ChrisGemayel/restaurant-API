const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(cors());

const PORT = process.env.PORT || 6001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

const user = require('./user');

app.use('/user', user);

app.listen(PORT, () => { 
	console.log('Server is running on PORT:', PORT);
});
