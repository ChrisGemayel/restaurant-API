// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./db');
const app = express();


app.use(cors());

const PORT = process.env.PORT || 6003;


const menuRoute = require('./menuRoute');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
	() => { console.log('Database is connected') },
	err => { console.log('Can not connect to the database' + err) }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

app.use('/menu', menuRoute);


app.listen(PORT, () => { 
	console.log('Server is running on PORT:', PORT);
});