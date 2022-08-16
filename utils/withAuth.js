// verifies user is logged in
const withAuth = (req, res, next) => {
    if (!req.session.patient_id) {
        res.redirect('/login');
    } else {
        console.log('made it');
        next();
    }
};

module.exports = withAuth;
