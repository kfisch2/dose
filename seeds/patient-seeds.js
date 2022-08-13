const { Patient } = require('../models');

const patientData = [
    {
        username: 'Person 1',
        email: 'email@gmail.com',
        password: 'yourpassword',
    },
    {
        username: 'Person 2',
        email: 'email@yahoo.com',
        password: 'NachoCheese123',
    },
    {
        username: 'Person 3',
        email: 'email@hotmail.com',
        password: 'DasPassMan',
    },
];

const seedPatient = () => Patient.bulkCreate(patientData);
module.exports = seedPatient;
