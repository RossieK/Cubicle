const { Router } = require('express');
const authService = require('../services/authService');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login page' });
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register page' });
});

router.post('/register', async(req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { error: { message: 'Password mismatch!' } });
    }

    try {
        let user = await authService.register({ username, password });
        res.redirect('/login');
    } catch (error) {
        res.render('register', { error });
    }
});

module.exports = router;