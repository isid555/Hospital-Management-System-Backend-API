const router = require('express').Router();
const doctorController = require('../controllers/doctorController');
const { verifyToken, verifyRole } = require('../auth/verifytoken')
const appointmentController = require('../controllers/appointmentController');

router.get('/', verifyToken, doctorController.getAllDoctors);
router.get('/profile', verifyToken, doctorController.getDoctorById);
router.put('/profile', verifyToken, verifyRole(['doctor', 'admin']), doctorController.updateDoctor);
router.delete('/profile', verifyToken, verifyRole((['doctor', 'admin'])), doctorController.deleteDoctor);
router.get('/profile/me', verifyToken, doctorController.getDoctorProfile);
router.get('/appointments', verifyToken, verifyRole(['doctor']), appointmentController.getAllAppointments);
router.put('/appointments/:id/complete', verifyToken, verifyRole(['doctor']), appointmentController.completeAppointment);
router.put('/appointments/:id/cancel', verifyToken, verifyRole(['doctor']), appointmentController.cancelAppointment);

module.exports = router;