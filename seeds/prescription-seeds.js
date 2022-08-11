const { Prescription } = require('../models');

const prescriptionData = [
    {
        rx: 'MED 1',
        refill_date: '01/02/2023',
        date_prescribed: '12/08/2022',
        cost: 50,
    },

    {
        rx: 'MED 2',
        refill_date: '01/02/2023',
        date_prescribed: '12/08/2022',
        cost: 250,
    },

    {
        rx: 'MED 3',
        refill_date: '01/02/2023',
        date_prescribed: '12/08/2022',
        cost: 150,
    },
];

const prescriptionSeed = () => Prescription.bulkCreate(prescriptionData);
module.exports = prescriptionSeed;
