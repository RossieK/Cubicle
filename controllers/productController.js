const { Router } = require('express');
const productService = require('../services/productService');
const validateProduct = require('../helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll(req.query);
    res.render('index', { title: "Cubicle", products });
});

router.get('/create', (req, res) => {
    res.render('create', { title: "Add a cube" });
});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

router.get('/details/:id', (req, res) => {
    let product = productService.getOne(req.params.id);
    res.render('details', { title: 'Details', product });
});

module.exports = router;