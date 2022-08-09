const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const bcrypt = require("bcrypt");

class Patient extends Model {
  // check password password
}

// table columns
Patient.init(
  {
    // id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newPatientData) {
        newPatientData.password = await bcrypt.hash(
          newPatientData.password,
          10
        );
        return newPatientData;
      },
      async beforeUpdate(updatedPatientData) {
        updatedPatientData.password = await bcrypt.hash(
          updatedPatientData.password,
          10
        );
        return updatedPatientData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "patient",
  }
);

module.exports = Patient;
