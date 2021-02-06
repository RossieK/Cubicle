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
            let isCreator = false;

            if (req.user._id == product.creator) {
                isCreator = true;
            }

            res.render('details', { title: 'Details', product, isCreator });
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
            if (req.user._id !== product.creator) {
                res.redirect(`/details/${req.params.id}`);
            }
            res.render('editCube', { title: 'Edit cube', product });
        })

});

router.post('/:id/edit', isAuthenticated, validateProduct, (req, res) => {
    productService.updateOne(req.params.id, req.body)
        .then(() => {
            if (req.user._id !== product.creator) {
                res.redirect(`/details/${req.params.id}`);
            }
            res.redirect(`/details/${req.params.id}`)
        })
        .catch(() => res.status(500).end());
});

router.get('/:id/delete', isAuthenticated, (req, res) => {
    productService.getOne(req.params.id)
        .then(product => {
            if (req.user._id !== product.creator) {
                res.redirect(`/details/${req.params.id}`);
            }
            res.render('deleteCube', { title: 'Delete Cube', product });
        })
        .catch(() => res.status(500).end());
});

router.post('/:id/delete', isAuthenticated, (req, res) => {
    productService.deleteOne(req.params.id)
        .then(() => {
            if (req.user._id !== product.creator) {
                res.redirect(`/details/${req.params.id}`);
            }

            res.redirect('/')
        })
        .catch(() => res.status(500).end());
});


module.exports = router;