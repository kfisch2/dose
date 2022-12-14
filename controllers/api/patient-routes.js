const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
//add withAuth to loggout route

const { Patient, Prescription, Diagnosis } = require('../../models');

// GET all Patients
router.get('/', (req, res) => {
    Patient.findAll({
        attributes: {
            exclude: ['password'],
        },
    })
        .then((dbPatientData) => res.json(dbPatientData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one Patient
router.get('/:id', (req, res) => {
    Patient.findOne({
        attributes: {
            exclude: ['password'],
        },
        where: {
            id: req.params.id,
        },
        include: [
            {
                model: Prescription,
            },
            {
                model: Diagnosis,
            },
        ],
    })
        .then((dbPatientData) => {
            if (!dbPatientData) {
                res.status(404).json({
                    message: 'No patient found with this id',
                });
                return;
            }
            res.json(dbPatientData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE Patient
router.post('/', (req, res) => {
    // expects {username: 'robin', email: 'robin-o@gmail.com', password: 'robin1234', phone_number: '2223334444'}
    Patient.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
    }).then((dbPatientData) => {
        req.session.save(() => {
            req.session.patient_id = dbPatientData.id;
            req.session.username = dbPatientData.username;
            req.session.loggedIn = true;

            res.json(dbPatientData);
            console.log(dbPatientData);
        });
    }).catch((err) => {
        res.status(500).json(err);
    });
});

//Update a Patient's phonenumber
router.put('/:id', (req, res) => {
    // expects {phone_number: 2223334444}
    Patient.update(
        {
            phone_number: req.body.phone_number,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbPatientData) => {
            if (!dbPatientData[0]) {
                res.status(404).json({
                    message: 'No patient found with this id',
                });
                return;
            }
            res.json(dbPatientData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// //CREATE LOGIN
//This should be good to go - just double check that declared session varables will work

router.post('/login', (req, res) => {
    // expects {username: 'robin', email: 'robin-o@gmail.com', password: 'robin1234'}
    Patient.findOne({
        where: {
            username: req.body.username,
        },
    }).then((dbPatientData) => {
        if (!dbPatientData) {
            // missing field function
            res.status(400).json({
                message: 'No patient with that username!',
            });
            return;
        }

        const validPassword = dbPatientData.checkPassword(req.body.password);

        if (!validPassword) {
            // missing field function
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.patient_id = dbPatientData.id;
            req.session.username = dbPatientData.username;
            req.session.loggedIn = true;

            res.json({
                user: dbPatientData,
                message: 'You are now logged in!',
            });
        });
    });
});

//logout of session
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
