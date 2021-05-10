import express from 'express';
import { APP_PORT } from './config';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';
const app = express();
const path = require('path');
// const PORT = process.env.PORT || 3000;
const mainRouter = require('./routes/main-router');
const userRouter = require('./routes/users-router');
const bookRouter = require('./routes/book-router');
const bodyParser = require('body-parser');

// add mongoose
const mongoose = require('mongoose');
const DB = 'mongodb+srv://tuntunpandit:tuntunpandit@cluster0.hkbo6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

// add cors
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// set view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));


// ---------- routers ----------------------------
app.use('/api', routes);
// app.use(mainRouter);
// app.use(userRouter);
// app.use(bookRouter);
// --------- Error Handler Middleware------------
app.use(errorHandler);
app.listen(APP_PORT, () => {
    console.log(`Express is running on port ${APP_PORT}`);
});