const router = require('express').Router();
const doctorController = require('../controllers/doctorController');
const { verifyToken, verifyRole } = require('../auth/verifytoken')

router.get('/', verifyToken, doctorController.getAllDoctors);
router.get('/:id', verifyToken, doctorController.getDoctorById);
router.put('/:id', verifyToken, verifyRole(['doctor', 'admin']), doctorController.updateDoctor);
router.delete('/:id', verifyToken, verifyRole((['doctor', 'admin'])), doctorController.deleteDoctor);
router.get('/profile/me', verifyToken, doctorController.getDoctorProfile);

module.exports = router;