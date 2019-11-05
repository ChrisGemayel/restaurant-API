'use strict';

const connection = require('./../getDbConnection');
var typeorm = require("typeorm");




async function getUserRepo(){
    try{
        console.log('establishing db connection');
        const dbConnection = await connection.getDbConnection();
        console.log('fetching repository');
        let userRepo = dbConnection.getRepository("restouser");
        return userRepo;
    }
    catch(error){
        throw("An error has occurred "+error);
    }
}


module.exports.registerUser = async function registerUser(user){
    try {
        var currentDate = new Date();
        var dateString = currentDate.getTime();

        const user1 = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email.toLowerCase(),
            date: dateString,
            address: user.address,
            phoneNumber: user.phoneNumber
        };
        console.log (user1);
        var userRepo = await getUserRepo();
        await userRepo.save(user1);
        return 'Successful';
    }
    catch(error){
        throw("An error has occurred" + error);
    }
}



module.exports.getUsers = async function getUsers(){
    try {
        const userRepo = await getUserRepo();
        let result = await userRepo.find();

        console.log("All Users fetched: \n", result ,"\n");

        return result;
    }
    catch(error){
        console.error('Failed to query due to error: ' + error.stack ? error.stack : error);
        throw error;
    }
}

module.exports.getUser = async function getUser(userid){
    try {
        const userRepo = await getUserRepo();
        let result = await userRepo.findOne({"id": userid});

        console.log("User fetched: \n", result ,"\n");

        return result;
    }
    catch(error){
        console.error('Failed to query due to error: ' + error.stack ? error.stack : error);
        throw error;
    }
}

module.exports.getUserByEmail = async function getUserByEmail(email){
    try {
        const userRepo = await getUserRepo();
        let result = await userRepo.findOne({"email": email});

        console.log("User fetched by email: \n", result ,"\n");

        return result;
    }
    catch(error){
        console.error('Failed to query due to error: ' + error.stack ? error.stack : error);
        throw error;
    }
}
