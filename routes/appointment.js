const router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');
const { verifyToken, verifyRole } = require('../auth/verifytoken');

// Get all appointments for the authenticated user
router.get('/my-appointments', verifyToken, appointmentController.getUserAppointments);

// Create a new appointment
router.post('/', verifyToken, verifyRole(['patient']), appointmentController.createAppointment);

// Get all appointments
router.get('/', verifyToken, verifyRole(['admin']), appointmentController.getAllAppointments);

router.get('/all-by-user', verifyToken ,  appointmentController.getAppointmentsByUser);


// Get an appointment by ID
router.get('/:id', verifyToken, verifyRole(['admin', 'doctor', 'patient']), appointmentController.getAppointmentById);

// Update an appointment
router.put('/:id', verifyToken, verifyRole(['doctor']), appointmentController.updateAppointment);

// Delete an appointment
router.delete('/:id', verifyToken, verifyRole(['doctor']), appointmentController.deleteAppointment);

// Cancel an appointment
router.put('/cancel/:id', verifyToken, verifyRole(['doctor', 'patient']), appointmentController.cancelAppointment);

// Mark an appointment as completed
router.put('/complete/:id', verifyToken, verifyRole(['doctor']), appointmentController.completeAppointment);

module.exports = router;