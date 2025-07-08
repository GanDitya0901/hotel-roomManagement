const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const roomManageRoute = require('./routes/roomManageRoute');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/rooms', roomManageRoute);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected Successfully');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Error to connect to MongoDB', err));