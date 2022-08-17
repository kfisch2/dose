const seedPatients = require('./patient-seeds');
const seedDiagnosis = require('./diagnosis-seeds');
const seedPrescription = require('./prescription-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedPatients();
  console.log('--------------');

  await seedDiagnosis();
  console.log('--------------');

  await seedPrescription();
  console.log('--------------');

  process.exit(0);
};

seedAll();
