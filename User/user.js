const express = require('express');
const user = express.Router();
const dbhelper = require("./utils/db-utils");

user.route('/register').post(async function (req, res) {
    try {
        await dbhelper.registerUser(req.body);
        const response = await dbhelper.getUserByEmail(req.body.email);
        console.log(`registered user ${response.id}\n`);
        res.status(200).send(response.id);
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

user.route('/').get(async function (req, res) {
    try {
        console.log("fetched user info with user id in the header");
        const response = await dbhelper.getUser(req.headers.user);
        console.log(response, "\n");
        res.status(200).send(response);
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

user.route('/all').get(async function (req, res) {
    try {
        console.log("fetched all users");
        const response = await dbhelper.getUsers();
        console.log(response, "\n");
        res.status(200).send(response);
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

module.exports = user;