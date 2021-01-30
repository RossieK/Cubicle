const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const validateProduct = require('../helpers/productHelpers');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('index', { title: "Cubicle", products });
        })
        .catch(() => res.status(500).end());

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
    productService.getOne(req.params.id)
        .then(product => {
            res.render('details', { title: 'Details', product });
        })
        .catch(() => res.status(500).end());
});

router.get('/:id/attach', async(req, res) => {
    let accessories = await accessoryService.getAll();

    productService.getOne(req.params.id)
        .then(product => {
            res.render('attachAccessory', { product, accessories });
        })
        .catch(() => res.status(500).end());
});

router.post('/:id/attach', (req, res) => {
    productService.attachAccessory(req.params.id, req.body.accessory)
        .then(() => res.redirect(`/details/${req.params.id}`))
        .catch(() => res.status(500).end());
});

module.exports = router;