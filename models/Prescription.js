const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Prescription extends Model {}

Prescription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    medication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refill_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    date_prescribed: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    diagnosis_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'diagnosis',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'prescription',
  }
);

module.exports = Prescription;
