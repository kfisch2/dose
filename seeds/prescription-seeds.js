const { Prescription } = require('../models');

const prescriptionData = [
    {
        rx: 'MED 1',
        refill_date: '01/02/2023',
        date_prescribed: '12/08/2022',
        cost: 50,
        patient_id: 1,
        diagnosis_id: 1,
    },

    {
        rx: 'MED 2',
        refill_date: '01/03/2023',
        date_prescribed: '12/08/2022',
        cost: 250,
        patient_id: 2,
        diagnosis_id: 2,
    },

    {
        rx: 'MED 3',
        refill_date: '01/04/2023',
        date_prescribed: '12/08/2022',
        cost: 150,
        patient_id: 3,
        diagnosis_id: 3,
    },
];

const prescriptionSeed = () => Prescription.bulkCreate(prescriptionData);
module.exports = prescriptionSeed;
