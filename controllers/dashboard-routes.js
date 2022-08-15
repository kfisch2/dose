const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/withAuth');
const { Prescription, Diagnosis, Patient } = require('../models');

// GET all Prescription
router.get('/', (req, res) => {
    console.log('made it here');
    // Prescription.findAll({
    //     where: {
    //         patient_id: req.session.patient_id,
    //     },
    //     attributes: [
    //         'prescription_name',
    //         'cost',
    //         'date_prescribed',
    //         'refill_date',
    //     ],
    //     include: [
    //         { model: Diagnosis, attributes: ['id', 'diagnosis_name'] },
    //         { model: Patient, attributes: ['username'] },
    //     ],
    // })
    //     .then((dbPrescriptionData) => {
    //         // serialize data before passing to template
    //         const prescriptions = dbPrescriptionData.map((prescription) =>
    //             prescription.get({ plain: true })
    //         );
    res.render('dashboard');
});
// .catch((err) => {
//     console.log(err);
//     res.status(500).json(err);
// });
// });

module.exports = router;
