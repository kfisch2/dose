const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const bcrypt = require('bcrypt');

// create User model
class Patient extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

// define table columns and configuration
Patient.init(
    {
        // id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
        phone_number: {
            type: DataTypes.STRING,
            validate: {
                len: [10],
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

        timestamps: false,

        freezeTableName: true,

        underscored: true,

        modelName: 'patient',
    }
);

module.exports = Patient;
