const router = require('express').Router();

const patientRoutes = require('./patient-routes');
const diagnosisRoutes = require('./diagnosis-routes');
const prescriptionRoutes = require('./prescription-routes');

router.use('/patients', patientRoutes);
router.use('/diagnosis', diagnosisRoutes);
router.use('/prescriptions', prescriptionRoutes);

module.exports = router;
