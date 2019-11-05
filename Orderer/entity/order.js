const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema ({
    "name": "order",
    "columns": {
        "orderId": {
            "primary": true,
            "type": "int",
            "generated": true
        },
        "userId": {
            "type": "int"
        },
        "date": {
            "type": "varchar"
        },
        "items": {
            "type": "varchar"
        },
        "totalCost": {
            "type": "int"
        }
    }
});