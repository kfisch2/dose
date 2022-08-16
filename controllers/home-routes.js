const router = require('express').Router();
const sequelize = require('../config/connection');
const { Patient, Prescription, Diagnosis } = require('../models');
require('dotenv').config();

//GET homepage
router.get('/', (req, res) => {
    res.render('homepage2', {
        loggedIn: req.session.loggedIn,
    });
});

//GET login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
