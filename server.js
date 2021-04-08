const express = require('express');
const app = express();
// const path = require('path');
const PORT = process.env.PORT || 3000;
const mainRouter = require('./routes/main-router');
const userRouter = require('./routes/users-router');
const bookRouter = require('./routes/book-router');
const bodyParser = require('body-parser');

// add mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/karan', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

// add cors
var cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(mainRouter);
app.use(userRouter);
app.use(bookRouter);

app.listen(3000, () => {
    console.log(`Express is running on port ${PORT}`);
});