const router = require('express').Router();
const withAuth = require('../../utils/withAuth');
//add withAuth to loggout route

const {
    Patient,
    Prescription,
    Diagnosis,
    Appointment,
} = require('../../models');

// GET all Patients
router.get('/', (req, res) => {
    Patient.findAll({
        //add back when login is created
        attributes: {
            exclude: ['password'],
        },
    })
        .then((dbPatiendData) => res.json(dbPatiendData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET one Patient
router.get('/:id', (req, res) => {
    Patient.findOne({
        // add when login is created
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
                model: Appointment,
            },
            {
                model: Diagnosis,
            },
        ],
    })
        .then((dbPatiendData) => {
            if (!dbPatiendData) {
                res.status(404).json({
                    message: 'No patient found with this id',
                });
                return;
            }
            res.json(dbPatiendData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// CREATE Patient
router.post('/', (req, res) => {
    // expects {username: 'robin', email: 'robin-o@gmail.com', password: 'robin1234'}
    Patient.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then((dbPatiendData) => {
        req.session.save(() => {
            req.session.patient_id = dbPatiendData.id;
            req.session.username = dbPatiendData.username;
            req.session.loggedIn = true;

            res.json(dbPatiendData);
        });
    });
});

// //CREATE LOGIN
//This should be good to go - just double check that declared session varables will work

router.post('/login', (req, res) => {
    // expects {username: 'robin', email: 'robin-o@gmail.com', password: 'robin1234'}
    Patient.findOne({
        where: {
            email: req.body.email,
        },
    }).then((dbPatiendData) => {
        if (!dbPatiendData) {
            res.status(400).json({
                message: 'No patient with that email address!',
            });
            return;
        }

        const validPassword = dbPatiendData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.patient_id = dbPatiendData.id;
            req.session.username = dbPatiendData.username;
            req.session.loggedIn = true;

            res.json({
                user: dbPatiendData,
                message: 'You are now logged in!',
            });
        });
    });
});

//logout of session
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
