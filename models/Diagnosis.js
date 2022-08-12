const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Diagnosis extends Model {}

Diagnosis.init(
    {
        // columns
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        diagnosis_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'id',
            },
        },
        prescription_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'prescription',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'diagnosis',
    }
);
module.exports = Diagnosis;
