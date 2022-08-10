const { Prescription } = require('../models');

const prescriptionData = [
  {
    medication: 'MED 1',
    refill_date: 09 / 08 / 2022,
    date_prescribed: 08 / 08 / 2022,
    cost: 50,
    diagnosis: 1,
  },

  {
    medication: 'MED 2',
    refill_date: 10 / 08 / 2022,
    date_prescribed: 08 / 08 / 2022,
    cost: 250,
    diagnosis: 3,
  },

  {
    medication: 'MED 3',
    refill_date: 11 / 08 / 2022,
    date_prescribed: 07 / 08 / 2022,
    cost: 150,
    diagnosis: 2,
  },
];

const prescriptionSeed = () => Prescription.bulkCreate(prescriptionData);
module.exports = prescriptionSeed;
