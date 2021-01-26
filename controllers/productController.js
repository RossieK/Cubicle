const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: "Cubicle" });
});

router.get('/create', (req, res) => {
    res.render('create', { title: "Add a cube" });
});

router.post('/create', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

router.get('/details/:id', (req, res) => {
    res.render('details', { title: 'Details' });
});

module.exports = router;