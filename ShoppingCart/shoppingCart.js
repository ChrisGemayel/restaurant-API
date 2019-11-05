const express = require('express');
const shopppingCart = express.Router();
const redis = require('redis');
var client = redis.createClient(6379, 'redis');

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});


shopppingCart.route('/').post(function (req, res) {
    try {
        console.log("Add req.body to the shoppingcart array with the key req.body.headers.user");
        client.rpush(req.headers.user, JSON.stringify(req.body), redis.print);
        client.lrange(req.headers.user, 0 ,-1, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            console.log('GET result ->' + result);
});
        res.status(200).send('OK');
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

shopppingCart.route('/').get(function (req, res) {
    try {
        console.log("takes user ID from the header req.body.headers.user and fetches the value");
        var foodarray = [];
        client.lrange(req.headers.user, 0 ,-1, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            for (let i = 0; i< result.length; i++){
                foodarray.push(JSON.parse(result[i]));
            }
            console.log('GET result ->' + result);

            res.status(200).send(
                { 'order' : foodarray }
            )
});
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

shopppingCart.route('/checkOut').post(function (req, res) {
    try {
        console.log("returns the array of json objects + deletes it all");
        let foodarray = [];
        client.lrange(req.headers.user, 0 ,-1, function (error, result) {
            if (error) {
                console.log(error);
                throw error;
            }
            for (let i = 0; i< result.length; i++){
                foodarray.push(JSON.parse(result[i]));
            }
            console.log('GET result ->' + result);
            client.del(req.headers.user);
            console.log('Shopping cart deleted');
            res.status(200).send(
                { 'order' : foodarray }
            )
});
    }
    catch(error) {
        res.status(500).send('Server Error');
    }
});

module.exports = shopppingCart;