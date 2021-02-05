const { Router } = require('express');

const isGuest = require('./helpers/isGuest');

const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

const router = Router();

router.use('/', productController);
router.use('/auth', isGuest, authController);
router.use('/accessories', accessoryController);
router.use('/about', aboutController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;