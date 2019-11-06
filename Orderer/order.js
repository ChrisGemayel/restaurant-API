const express = require('express');
const order = express.Router();
const dbhelper = require("./utils/db-utils");
const http = require('http');


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
        var options = {
            host: "shoppingcart",
            port: 6000,
            method: "POST",
            path: "/shoppingCart/checkOut",
            headers: {
                "Content-Type": "application/json",
                "user": req.headers.user,
                "Content-Length" : Buffer.byteLength("")
            }
        };

        console.log(options);
        
        const requ = http.request(options, (resp) => {
            resp.on('data', async function(d) {
                console.log(d);
                console.log("Data fetched from Shoppingcart Microservice", JSON.parse(d));
                
                const response = await dbhelper.registerOrder(req, JSON.parse(d));
                console.log(response, "\n");
                res.status(200).send(response);
            })
        });
        requ.on('error', (error) => {
            console.log(error)
        });
        requ.end();

    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

module.exports = order;