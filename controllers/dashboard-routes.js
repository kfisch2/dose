const router = require('express').Router();
const sequelize = require('../config/connection');
const { Prescription, Diagnosis } = require('../models');

// GET all Prescription
router.get('/', (req, res) => {
    console.log('made it here');
    Prescription.findAll({
        where: {
            patient_id: req.session.patient_id,
        },
        attributes: [
            'prescription_name',
            'cost',
            'date_prescribed',
            'refill_date',
        ],
        include: [{ model: Diagnosis, attributes: ['id', 'diagnosis_name'] }],
    })
        .then((dbPostData) => {
            // serialize data before passing to template
            const prescriptions = dbPostData.map((prescription) =>
                prescription.get({ plain: true })
            );
            res.render('dashboard', { prescriptions, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
