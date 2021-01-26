const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { layout: false });
});

router.get('/create', (req, res) => {
    res.render('create', { layout: false });
});

module.exports = router;