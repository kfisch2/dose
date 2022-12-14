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
        rx: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refill_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            validate: {
                isDate: true,
            },
        },
        date_prescribed: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        patient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'patient',
                key: 'id',
            },
        },
        // diagnosis_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'diagnosis',
        //         key: 'id',
        //     },
        // },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'prescription',
    }
);

module.exports = Prescription;
