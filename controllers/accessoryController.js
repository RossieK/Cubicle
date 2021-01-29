const { Router } = require('express');
const accessoryService = require('../services/accessoryService');

const router = Router();

router.get('/create', (req, res) => {
    res.render('createAccessory');
});

//TODO: Create validation middleware or just validate incoming data
router.post('/create', (req, res) => {
    accessoryService.createAccessory(req.body)
        .then(() => res.redirect('/'))
        .catch(() => res.status(500).end());
});

module.exports = router;