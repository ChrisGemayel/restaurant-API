'use strict';

var typeorm = require("typeorm");
var cachedConnection;

module.exports.getDbConnection = async function getDbConnection() {
    if (!cachedConnection){
        cachedConnection = await typeorm.createConnection({
            type: "postgres",
            host: "postgres",
            port: 5432,
            username: "postgres",
            password: "1234",
            database: "restodb",
            synchronize: true,
            entities: [
                require('./entity/order.js')
            ]
        })
    }
    return cachedConnection;
}