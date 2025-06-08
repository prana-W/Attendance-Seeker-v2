const router = require('express').Router();
const {handleGetUserDashboard} = require('../controllers/attendance.controller');

router.get('/:reg_no', handleGetUserDashboard)

module.exports = router;