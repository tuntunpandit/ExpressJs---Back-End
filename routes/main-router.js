const router = require('express').Router();

// const apiKeyMiddleWare = require('../middlewares/apiKey');



// it was for different purpose ---- testing api -----

router.get('/', (req, res) => {
    res.render('index', {
        title: 'HOME'
    });
});
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'ABOUT'
    });
});
router.get('/download', (req, res) => {
    res.download('about');
});

router.get('/api/products', (req, res) => {
    res.json([
        {
            id: 1,
            name: 'chrome'
        },
        {
            id: 2,
            name: 'mozilla'
        }
    ])
});

module.exports = router;