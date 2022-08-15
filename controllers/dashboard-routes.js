const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/withAuth');
const { Prescription, Diagnosis, Patient } = require('../models');

// GET all Prescription
router.get('/', (req, res) => {
    console.log('made it here');
    Prescription.findAll({
        where: {
            patient_id: req.session.patient_id,
        },
        attributes: ['id', 'rx', 'cost', 'refill_date', 'date_prescribed'],
        include: [
            { model: Diagnosis, attributes: ['id', 'diagnosis_name'] },
            { model: Patient, attributes: ['username'] },
        ],
    })
        .then((dbPrescriptionData) => {
            // serialize data before passing to template
            const prescriptions = dbPrescriptionData.map((prescription) =>
                prescription.get({ plain: true })
            );
            res.render('dashboard', { prescriptions, loggedIn: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get edit prescription
router.get('/edit/:id', (req, res) => {
    Prescription.findByPk(req.params.id, {
        attributes: ['cost', 'refill_date'],
        include: [
            { model: Diagnosis, attributes: ['id', 'diagnosis_name'] },
            { model: Patient, attributes: ['username'] },
        ],
    })
        .then((dbPrescriptionData) => {
            if (dbPrescriptionData) {
                const prescription = dbPrescriptionData.get({ plain: true });

                res.render('edit-prescription', {
                    prescription,
                    loggedIn: true,
                });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
