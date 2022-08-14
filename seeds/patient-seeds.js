const { Patient } = require('../models');

const patientData = [
    {
        username: 'Person1',
        email: 'email@gmail.com',
        password: 'yourpassword',
        phone_number: '1234567895',
    },
    {
        username: 'Person2',
        email: 'email@yahoo.com',
        password: '123',
        phone_number: '234',
    },
    {
        username: 'Person3',
        email: 'email@hotmail.com',
        password: 'DasPassMan',
        phone_number: '971',
    },
];

const seedPatient = () => Patient.bulkCreate(patientData);
module.exports = seedPatient;
