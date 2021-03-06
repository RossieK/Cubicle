const { Router } = require('express');
const accessoryService = require('../services/accessoryService');
const { validateAccessory } = require('../helpers/validationMiddlewares');

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', { title: "Add accessory" });
});

router.post('/create', validateAccessory, (req, res) => {
    accessoryService.createAccessory(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

module.exports = router;