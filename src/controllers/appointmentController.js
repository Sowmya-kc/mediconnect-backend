const db = require('../config/database');
const { sendEmail } = require('../utils/email');

// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { doctorId, appointmentDate, appointmentTime, symptoms } = req.body;

    if (!doctorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const patientResult = await db.query(
      'SELECT id, full_name FROM patients WHERE user_id = $1',
      [userId]
    );

    if (patientResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    const patientId = patientResult.rows[0].id;
    const patientName = patientResult.rows[0].full_name;

    const doctorResult = await db.query(
      'SELECT id, full_name FROM doctors WHERE id = $1',
      [doctorId]
    );

    if (doctorResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    const doctorName = doctorResult.rows[0].full_name;

    const existingAppointment = await db.query(
      `SELECT id FROM appointments 
       WHERE doctor_id = $1 AND appointment_date = $2 
       AND appointment_time = $3 AND status != 'cancelled'`,
      [doctorId, appointmentDate, appointmentTime]
    );

    if (existingAppointment.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'This slot is already booked. Please choose another time.'
      });
    }

    const result = await db.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, symptoms, status)
       VALUES ($1, $2, $3, $4, $5, 'scheduled')
       RETURNING id`,
      [patientId, doctorId, appointmentDate, appointmentTime, symptoms || null]
    );

    const appointmentId = result.rows[0].id;

    try {
      await sendEmail(
        req.user.email,
        'Appointment Confirmation - MediConnect',
        `<h2>Appointment Booked!</h2>
        <p>Dear ${patientName},</p>
        <p>Your appointment has been confirmed with ${doctorName} on ${appointmentDate} at ${appointmentTime}.</p>`
      );
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointmentId
    });

  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error booking appointment'
    });
  }
};

// GET PATIENT'S APPOINTMENTS
const getPatientAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

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

    const result = await db.query(
      `SELECT a.id, a.appointment_date, a.appointment_time, a.status, 
              a.symptoms, a.notes, d.full_name as doctor_name, 
              d.specialization, a.created_at
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       WHERE a.patient_id = $1
       ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
      [patientId]
    );

    res.json({
      success: true,
      appointments: result.rows
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments'
    });
  }
};

// CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointmentId = req.params.id;

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

    const result = await db.query(
      `UPDATE appointments 
       SET status = 'cancelled'
       WHERE id = $1 AND patient_id = $2
       RETURNING id`,
      [appointmentId, patientId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling appointment'
    });
  }
};

module.exports = { bookAppointment, getPatientAppointments, cancelAppointment };