const router = require('express').Router();
// const withAuth = require('../../utils/auth');
//add withAuth to loggout route - and update

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
            // {
            //     model: Diagnosis,
            // },
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
    // expects {rx: "test", refill_date: "11/04/2022", date_prescribed: "09/09/2022", cost: 20, patient_id : 2, diagnosis_id : 3}
    Prescription.create({
        rx: req.body.rx,
        refill_date: req.body.refill_date,
        date_prescribed: req.body.date_prescribed,
        cost: req.body.cost,
        patient_id: req.session.patient_id,
        // diagnosis_id: req.body.diagnosis_id,
    })
        .then((dbPrescriptionData) => {
            res.json(dbPrescriptionData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Update a perscription's refill_date and cost
router.put('/:id', (req, res) => {
    // expects {refill_date: "11/04/2022", cost: 20}
    Prescription.update(
        {
            refill_date: req.body.refill_date,
            cost: req.body.cost,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbPrescriptionData) => {
            if (!dbPrescriptionData[0]) {
                res.status(404).json({
                    message: 'No prescription found with this id',
                });
                return;
            }
            res.json(dbPrescriptionData);
            console.log(dbPrescriptionData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
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
