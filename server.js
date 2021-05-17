import express from 'express';
import routes from './routes';
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middlewares/errorHandler';
import mongoose from 'mongoose';
const app = express();

// const path = require('path');
// const PORT = process.env.PORT || 3000;
// const mainRouter = require('./routes/main-router');
// const userRouter = require('./routes/users-router');
// const bookRouter = require('./routes/book-router');
// const bodyParser = require('body-parser');

// connect mongoose database
// const DB = 'mongodb+srv://tuntunpandit:tuntunpandit@cluster0.hkbo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB Connected');
});

// add cors
// const cors = require('cors');
// app.use(cors({
//     origin: 'http://localhost:4200'
// }));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

// set view engine
// app.set('view engine', 'ejs');

// app.use(express.static('public'));


// ---------- All Routers gateway----------------------------
app.use('/api', routes);

// --------- Error Handler Middleware------------
app.use(errorHandler);

//listening express app 
app.listen(APP_PORT, () => {
    console.log(`Express is running on port ${APP_PORT}`);
});