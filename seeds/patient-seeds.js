const { Patient } = require('../models');

const patientData = [
    {
        username: 'Person 1',
        email: 'email@gmail.com',
        password: 'yourpassword',
        phone_number: '1234567895435345431',
    },
    {
        username: 'Person 2',
        email: 'email@yahoo.com',
        password: '1',
        phone_number: null,
    },
    {
        username: 'Person 3',
        email: 'email@hotmail.com',
        password: 'DasPassMan',
        phone_number: '9',
    },
];

const seedPatient = () => Patient.bulkCreate(patientData);
module.exports = seedPatient;
