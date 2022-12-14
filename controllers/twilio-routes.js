const router = require('express').Router();
const sequelize = require('../config/connection');
const { Patient, Prescription, Diagnosis } = require('../models');
const cron = require('node-cron');
require('dotenv').config();
const client = require('twilio')(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
);

function sendTextNotification(phone) {
    client.messages
        .create({
            body: 'Your prescription needs to be refilled in 3 days',
            to: `+1${phone}`,
            from: process.env.PHONE_SENDER,
        })
        .then((message) => console.log(message))
        .catch((err) => console.log(err));
}

router.get('/', async (req, res, next) => {
    const results = await Prescription.findAll({
        where: {
            patient_id: req.session.patient_id,
        },
        attibutes: ['id', 'refill_date', 'date_prescribed'],
        raw: true,
    });
    res.status(200).json({
        results,
    });
    for (i = 0; i < results.length; i++) {
        // takes refill date and subtracts 3 days for reminder
        let reminderDate = new Date(results[i].refill_date);
        console.log(reminderDate,"here");
        reminderDate.setDate(reminderDate.getDate() - 2);
        const day = reminderDate.getDate();
        const month = reminderDate.getMonth() + 1;

        cron.schedule(`00 12 ${day} ${month} *`, () => {
            console.log('schedule test');
            // hard coded phone number that is verified on the twilio trial account.
            // Can change this to take the user's number with a paid twilio account
            sendTextNotification(process.env.PHONE_RECEIVER);
        });
    }
});

router.get('/:id', async (req, res, next) => {
    const results = await Prescription.findOne({
        where: {
            id: req.params.id,
        },
        attibutes: ['id', 'refill_date', 'date_prescribed'],
        raw: true,
    });
    res.status(200).json({
        results,
    });

    // takes refill date and subtracts 3 days for reminder
    let reminderDate = new Date(results.refill_date);
    console.log(reminderDate);
    reminderDate.setDate(reminderDate.getDate() - 2);
    const day = reminderDate.getDate();
    const month = reminderDate.getMonth() + 1;
    console.log(`reminder day: ${day}; reminder month: ${month}`);

    const textNotification = cron.schedule(`12 19 ${day} ${month} *`, () => {
        console.log('schedule test');
        // hard coded phone number that is verified on the twilio trial account.
        // Can change this to take the user's number with a paid twilio account
        sendTextNotification(process.env.PHONE_RECEIVER);
    });
    textNotification.start();
});

module.exports = router;
