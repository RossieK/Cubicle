const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: "Cubicle" });
});

router.get('/create', (req, res) => {
    res.render('create', { title: "Add a cube" });
});

module.exports = router;