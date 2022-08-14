// const router = require('express').Router();
// const sequelize = require('../config/connection');
// const { Patient, Prescription, Diagnosis } = require('../models');
// const cron = require('node-cron');
// require('dotenv').config();
// const client = require('twilio')(
//     process.env.TWILIO_SID,
//     process.env.TWILIO_AUTH
// );

// function sendTextNotification() {
//     client.messages
//         .create({
//             body: 'Your prescription needs to be refilled in 3 days',
//             to: `+1${process.env.PHONE_RECEIVER}`,
//             from: process.env.PHONE_SENDER,
//         })
//         .then((message) => console.log(message))
//         .catch((err) => console.log(err));
// }

// router.get('/', async (req, res, next) => {
//     const results = await Prescription.findAll({
//         attibutes: ['id', 'refill_date', 'date_prescribed'],
//         raw: true,
//     });
//     res.status(200).json({
//         results,
//     });
//     console.log('refill date: ', results[0].refill_date);
//     for (i = 0; i < results.length; i++) {
//         const refillDate = results[i].refill_date;
//         const day = refillDate.split('-')[2];
//         const month = refillDate.split('-')[1];
//         // const day = 13;
//         // const month = 8;
//         console.log(`Scheduled reminders for ${month}/${day}`);

//         cron.schedule(`00 12 ${day} ${month} *`, () => {
//             console.log('schedule test');
//             //sendTextNotification();
//         });
//     }
// });

// module.exports = router;
