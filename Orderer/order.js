const express = require('express');
const order = express.Router();
const dbhelper = require("./utils/db-utils");

order.route('/user').get(async function (req, res) {
    try {
        console.log("get orders of user details");
        const response = await dbhelper.getOrders(req.headers.user);
        console.log(response, "\n");
        res.status(200).send(response);
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

order.route('/').get(async function (req, res) {
    try {
        console.log("get order details");
        const response = await dbhelper.getOrder(req.headers.order);
        console.log(response, "\n");
        res.status(200).send(response);
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

order.route('/').post(async function (req, res) {
    try {
        console.log("registers an order");
        const response = await dbhelper.registerOrder(req);
        console.log(response, "\n");
        res.status(200).send(response);
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

module.exports = order;