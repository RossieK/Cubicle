const { Router } = require('express');
const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');
const accessoryController = require('./controllers/accessoryController');

const router = Router();

router.use('/', productController);
router.use('/accessories', accessoryController);
router.use('/about', aboutController);
router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;