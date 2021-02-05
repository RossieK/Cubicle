const { Router } = require('express');
const authService = require('../services/authService');
const config = require('../config/config');

const router = Router();

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login page' });
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });
        res.cookie(config.COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { error });
    }
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
        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { error });
    }
});

module.exports = router;