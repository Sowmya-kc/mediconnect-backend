const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getDoctors } = require('../controllers/patientController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

router.use(authenticateToken);
router.use(authorizeRole('patient'));

// GET /api/patients/profile
router.get('/profile', getProfile);

// PUT /api/patients/profile
router.put('/profile', updateProfile);

// GET /api/patients/doctors
router.get('/doctors', getDoctors);

module.exports = router;