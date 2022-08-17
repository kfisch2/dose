const Patient = require('./Patient');
const Diagnosis = require('./Diagnosis');
const Prescription = require('./Prescription');
// const Appointment = require("./Appointment");

Patient.hasMany(Prescription, {
    foreignKey: 'patient_id',
});

Patient.hasMany(Diagnosis, {
    foreignKey: 'patient_id',
});

Diagnosis.belongsTo(Patient, {
    foreignKey: 'patient_id',
});

Diagnosis.hasMany(Prescription, {
    foreignKey: 'diagnosis_id',
});

Prescription.belongsTo(Patient, {
    foreignKey: 'patient_id',
});

Prescription.belongsTo(Diagnosis, {
    foreignKey: 'diagnosis_id',
});

module.exports = { Patient, Diagnosis, Prescription };
