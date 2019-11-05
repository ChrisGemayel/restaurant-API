const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Menu = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
},{
    collection: 'menu'
});

module.exports = mongoose.model('Menu', Menu);