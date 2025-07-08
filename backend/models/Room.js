const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomID: Number,
    roomName: String, 
    roomType: String, 
    price: Number, 
});

module.exports = mongoose.model('Room', roomSchema);