const { Router } = require('express');
const authService = require('../services/authService');
const config = require('../config/config');

const isGuest = require('../helpers/isGuest');
const isAuthenticated = require('../helpers/isAuthenticated');

const router = Router();

router.get('/login', isGuest, (req, res) => {
    res.render('login', { title: 'Login page' });
});

router.post('/login', isGuest, async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });
        res.cookie(config.COOKIE_NAME, token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { title: 'Login page', error });
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('register', { title: 'Register page' });
});

router.post('/register', isGuest, async(req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.render('register', { title: 'Register page', error: 'Password mismatch!' });
    }

    try {
        let user = await authService.register({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        res.render('register', { title: 'Register page', error });
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(config.COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;