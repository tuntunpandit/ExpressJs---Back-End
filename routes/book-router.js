var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var Reader = require('../models/reader');

// add new book
router.post('/api/addBook', function (req, res, next) {
    var newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    });

    let promise = newBook.save();

    promise.then(function (doc) {
        return res.status(201).json(doc);
    });

    promise.catch(function (err) {
        return res.status(501).json({
            message: 'Error while adding book.'
        });
    })
});

// add new reader
router.post('/api/addReader', function (req, res, next) {
    var newReader = new Reader({
        name: req.body.name,
        weeklyReadingGoal: req.body.weeklyReadingGoal,
        totalMinutesRead: req.body.totalMinutesRead
    });

    let promise = newReader.save();

    promise.then(function (doc) {
        return res.status(201).json(doc);
    });

    promise.catch(function (err) {
        return res.status(501).json({
            message: 'Error while adding reader.'
        });
    })
});

// get all books
router.get('/api/getBooks', function (req, res, next) {
    Book.find().then(books => {
        if (books) {
            res.status(200).json({
                message: "Books fetched successfully!",
                books: books
            });
        }
    }).catch(e => {
        console.log(e)
    });
});

//get all readers
router.get('/api/getReaders', function (req, res, next) {
    Reader.find().then(readers => {
        if (readers) {
            res.status(200).json({
                message: "Readers fetched successfully!",
                readers: readers
            });
        }
    }).catch(e => {
        console.log(e)
    });
});

// get book by id
router.get('/api/getBookById', function (req, res, next) {
    Book.findById(req.body._id).then(book => {
        if (book) {
            res.status(200).json({
                message: "Book fetched successfully!",
                book: book
            })
        }
    }).catch(e => {
        console.log(e)
    })
})

// get reader by id
router.get('/api/getReaderById', function (req, res, next) {
    Reader.findById(req.body._id).then(reader => {
        if (reader) {
            res.status(200).json({
                message: "Reader fetched successfully!",
                reader: reader
            })
        }
    }).catch(e => {
        console.log(e)
    })
})
module.exports = router;