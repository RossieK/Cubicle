const { Router } = require('express');
const productService = require('../services/productService');

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll();
    res.render('index', { title: "Cubicle", products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: "Add a cube" });
});

router.post('/create', (req, res) => {
    productService.create(req.body);

    res.redirect('/');
});

router.get('/details/:id', (req, res) => {
    let product = productService.getOne(req.params.id);
    res.render('details', { title: 'Details', product });
});

module.exports = router;