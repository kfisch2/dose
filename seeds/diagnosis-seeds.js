const { Diagnosis } = require('../models');

const diagnosisData = [
    {
        name: 'Diagnosis 1',
        patient_id: 1,
        prescription_id: 1,
    },
    {
        name: 'Diagnosis 2',
        patient_id: 2,
        prescription_id: 2,
    },
    {
        name: 'Diagnosis 3',
        patient_id: 3,
        prescription_id: 3,
    },
    {
        name: 'Diagnosis 4',
        patient_id: 3,
        prescription_id: 3,
    },
];

const seedDiagnosis = () => Diagnosis.bulkCreate(diagnosisData);

module.exports = seedDiagnosis;
