const router = require('express').Router();
// const withAuth = require('../../utils/auth');
//add withAuth to loggout route

const { Patient, Prescription, Diagnosis } = require('../../models');

// GET all Diagnosis
router.get('/', (req, res) => {
    Diagnosis.findAll({})
        .then((dbDiagnosisData) => res.json(dbDiagnosisData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one Diagnosis
router.get('/:id', (req, res) => {
    Diagnosis.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Patient,
                attributes: ['id'],
            },
            {
                model: Prescription,
                attributes: ['id'],
            },
        ],
    })
        .then((dbDiagnosisData) => {
            if (!dbDiagnosisData) {
                res.status(404).json({
                    message: 'No Diagnosis found with this id',
                });
                return;
            }
            res.json(dbDiagnosisData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE Diagnosis
router.post('/', (req, res) => {
    // expects {name: 'ADHD', Patient_id: '1'}
    Diagnosis.create({
        diagnosis_name: req.body.diagnosis_name,
        patient_id: req.body.patient_id,
        //will be req.session.patiend_id
    }).then((dbDiagnosisData) => {
        res.json(dbDiagnosisData);
    });
});

//Delete Diagnosis
router.delete('/:id', (req, res) => {
    console.log('id', req.params.id);
    Diagnosis.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbDiagnosisData) => {
            if (!dbDiagnosisData) {
                res.status(404).json({
                    message: 'No diagnosis found with this id',
                });
                return;
            }
            res.json(dbDiagnosisData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
