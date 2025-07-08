const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create new room
router.post('/', async (req,res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json(room);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Get all rooms
router.get('/', async (req,res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

//Delete room by ID
router.delete('/:id', async (req,res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.json({ message: 'Room deleted' })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;