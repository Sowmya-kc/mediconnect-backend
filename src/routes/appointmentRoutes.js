const express = require('express');
const router = express.Router();
const { bookAppointment, getPatientAppointments, cancelAppointment } = require('../controllers/appointmentController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.use(authenticateToken);
router.use(authorizeRole('patient'));

// POST /api/appointments/book
router.post('/book', bookAppointment);

// GET /api/appointments
router.get('/', getPatientAppointments);

// PUT /api/appointments/:id/cancel
router.put('/:id/cancel', cancelAppointment);

module.exports = router;