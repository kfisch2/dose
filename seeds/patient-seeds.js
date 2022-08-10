const { Patient } = require('../models');

const patientData = [
  {
    name: 'Person 1',
    email: 'email@gmail.com',
    password: 'yourpassword'
  },
  {
    name: 'Person 2',
    email: 'email@yahoo.com',
    password: 'NachoCheese123'
  },
  {
    name: 'Person 3',
    email: 'email@hotmail.com',
    password: 'DasPassMan'
  }
];

const seedPatient = () => Patient.bulkCreate(patientData);
module.exports = seedPatient;