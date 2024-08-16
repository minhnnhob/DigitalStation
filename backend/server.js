require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const workoutsRouter = require('./routes/workouts');
const userRouter = require('./routes/user');

const cros = require('cors');

const app = express();

//middleware
app.use(cros());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
});

//routes

app.use('/api/workouts', workoutsRouter);
app.use('/api/users', userRouter);

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //Listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Server is running on',process.env.PORT);
    });
    
})
.catch((error) => {
    console.log('Error connecting to the database', error);
})



