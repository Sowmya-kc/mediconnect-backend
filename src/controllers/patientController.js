const db = require('../config/database');

// GET PATIENT PROFILE
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT u.id, u.email, u.role, p.full_name, p.date_of_birth, 
              p.gender, p.blood_group, p.phone, p.address, p.emergency_contact
       FROM users u
       JOIN patients p ON u.id = p.user_id
       WHERE u.id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    res.json({
      success: true,
      profile: result.rows[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
};

// UPDATE PATIENT PROFILE
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, dateOfBirth, gender, bloodGroup, phone, address, emergencyContact } = req.body;

    const patientResult = await db.query(
      'SELECT id FROM patients WHERE user_id = $1',
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    const patientId = patientResult.rows[0].id;

    await db.query(
      `UPDATE patients 
       SET full_name = $1, date_of_birth = $2, gender = $3, 
           blood_group = $4, phone = $5, address = $6, emergency_contact = $7
       WHERE id = $8`,
      [fullName, dateOfBirth, gender, bloodGroup, phone, address, emergencyContact, patientId]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
};

// GET ALL DOCTORS
const getDoctors = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT d.id, d.full_name, d.specialization, d.qualification, 
              d.experience, d.consultation_fee, d.available_days
       FROM doctors d
       ORDER BY d.full_name`
    );

    res.json({
      success: true,
      doctors: result.rows
    });

  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors'
    });
  }
};

module.exports = { getProfile, updateProfile, getDoctors };