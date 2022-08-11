const router = require('express').Router();
// const withAuth = require('../../utils/auth');
//add withAuth to loggout route

const { Patient, Prescription, Diagnosis } = require('../../models');

// GET all Prescription
router.get('/', (req, res) => {
    Prescription.findAll({})
        .then((dbPrescriptionData) => res.json(dbPrescriptionData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one Prescription
router.get('/:id', (req, res) => {
    Prescription.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Diagnosis,
            },
            {
                model: Patient,
                attributes: ['id'],
            },
        ],
    })
        .then((dbPrescriptionData) => {
            if (!dbPrescriptionData) {
                res.status(404).json({
                    message: 'No Prescription found with this id',
                });
                return;
            }
            res.json(dbPrescriptionData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE Prescription
router.post('/', (req, res) => {
    // expects {name: 'ADHD', Patient_id: '1'}
    Prescription.create({
        rx: req.body.rx,
        refill_date: req.body.refill_date,
        date_prescribed: req.body.date_prescribed,
        cost: req.body.cost,
        patient_id: req.body.patient_id,
        diagnosis_id: req.body.diagnosis_id,
        //will be req.session.patiend_id
    }).then((dbPrescriptionData) => {
        res.json(dbPrescriptionData);
    });
});

//Delete Prescription
router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Prescription.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbPrescriptionData) => {
            if (!dbPrescriptionData) {
                res.status(404).json({
                    message: 'No Prescription found with this id',
                });
                return;
            }
            res.json(dbPrescriptionData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
