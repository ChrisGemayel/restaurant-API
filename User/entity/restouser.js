const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema ({
    "name": "restouser",
    "columns": {
        "id": {
            "primary": true,
            "type": "int",
            "generated": true
        },
        "firstName": {
            "type": "varchar"
        },
        "lastName": {
            "type": "varchar"
        },
        "email": {
            "type": "varchar"
        },
        "phoneNumber": {
            "type": "varchar"
        },
        "address": {
            "type": "varchar"
        },
        "date": {
            "type": "varchar"
        }
    }
});