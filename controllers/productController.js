const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const { validateProduct } = require('../helpers/validationMiddlewares');
const isAuthenticated = require('../helpers/isAuthenticated');

const router = Router();

router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            res.render('index', { title: "Cubicle", products });
        })
        .catch(() => res.status(500).end());

});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: "Add a cube" });
});

router.post('/create', isAuthenticated, validateProduct, (req, res) => {
    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

router.get('/details/:id', (req, res) => {
    productService.getOneWithAccessories(req.params.id)
        .then(product => {
            res.render('details', { title: 'Details', product });
        })
        .catch(() => res.status(500).end());
});

router.get('/:id/attach', isAuthenticated, (req, res) => {
    productService.getOne(req.params.id)
        .then(product => {
            accessoryService.getAllWithout(product.accessories)
                .then(accessories => {
                    res.render('attachAccessory', { title: "Attach accessory", product, accessories });
                });
        })
        .catch(() => res.status(500).end());
});

router.post('/:id/attach', isAuthenticated, (req, res) => {
    productService.attachAccessory(req.params.id, req.body.accessory)
        .then(() => res.redirect(`/details/${req.params.id}`))
        .catch(() => res.status(500).end());
});

router.get('/:id/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.id)
        .then(product => {
            res.render('editCube', product)
        })

});

router.post('/:id/edit', isAuthenticated, validateProduct, (req, res) => {
    productService.updateOne(req.params.id, req.body)
        .then(() => res.redirect(`/details/${req.params.id}`))
        .catch(() => res.status(500).end());
});

module.exports = router;