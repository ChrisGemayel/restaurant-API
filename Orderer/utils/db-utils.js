'use strict';

const connection = require('./../getDbConnection');
var typeorm = require("typeorm");




async function getOrderRepo(){
    try{
        console.log('establishing db connection');
        const dbConnection = await connection.getDbConnection();
        console.log('fetching repository');
        let orderRepo = dbConnection.getRepository("order");
        return orderRepo;
    }
    catch(error){
        throw("An error has occurred "+error);
    }
}


module.exports.registerOrder = async function registerOrder(order, shoppingcart){
    try {
        var currentDate = new Date();
        var dateString = currentDate.getTime();
        var totalprice = 0;

        for (let i = 0; i < shoppingcart.order.length; i++){
            totalprice += shoppingcart.order[i].price; 
        }

        const order1 = {
            userId: order.headers.user,
            date: dateString,
            items: JSON.stringify(shoppingcart.order),
            totalCost: totalprice
        };

        console.log (order1);
        var orderRepo = await getOrderRepo();
        await orderRepo.save(order1);

        return 'Successful';
    }
    catch(error){
        throw("An error has occurred" + error);
    }
}



module.exports.getOrders = async function getOrders(userid){
    try {
        const orderRepo = await getOrderRepo();
        let result = await orderRepo.find({"userId": userid});

        console.log("All orders fetched: \n", result ,"\n");

        return result;
    }
    catch(error){
        console.error('Failed to query due to error: ' + error.stack ? error.stack : error);
        throw error;
    }
}

module.exports.getOrder = async function getOrder(orderid){
    try {
        const orderRepo = await getOrderRepo();
        let result = await orderRepo.findOne({"orderId": orderid});

        console.log("Order fetched: \n", result ,"\n");

        return result;
    }
    catch(error){
        console.error('Failed to query due to error: ' + error.stack ? error.stack : error);
        throw error;
    }
}

module.exports.getUserByEmail = async function getUserByEmail(email){
    try {
        const userRepo = await getOrderRepo();
        let result = await userRepo.findOne({"email": email});

        console.log("Order fetched by email: \n", result ,"\n");

        return result;
    }
    catch(error){
        console.error('Failed to query due to error: ' + error.stack ? error.stack : error);
        throw error;
    }
}
