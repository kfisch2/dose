const { Diagnosis } = require('../models');

const diagnosisData = [
    {
        diagnosis_name: 'Diagnosis 1',
        patient_id: 1,
    },
    {
        diagnosis_name: 'Diagnosis 2',
        patient_id: 2,
    },
    {
        diagnosis_name: 'Diagnosis 3',
        patient_id: 3,
    },
];

const seedDiagnosis = () => Diagnosis.bulkCreate(diagnosisData);

module.exports = seedDiagnosis;
