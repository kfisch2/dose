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

// router.get('/prescriptions'),
//     (req, res) => {
//         Patient.findAll({
//             attributes: ['id', 'name', 'email'],
//             include: [
//                 {
//                     model: Diagnosis,
//                     attributes: ['id', 'name', 'patient_id'],
//                     include: {
//                         model: Prescription,
//                         attributes: [
//                             'id',
//                             'medication',
//                             'refill_date',
//                             'date_prescribed',
//                             'cost',
//                         ],
//                     },
//                 },
//             ],
//         })
//             .then((dbPatientData) => {
//                 const patients = dbPatientData.map((post) =>
//                     post.get({ plain: true })
//                 );
//                 res.render('prescriptions', patients);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     };

module.exports = router;
