const router = require('express').Router();
const prescriptionController = require('../controllers/prescriptionController');
const { verifyToken, verifyRole }  = require('../auth/verifytoken');

router.get('/', verifyToken, prescriptionController.getAllPrescriptions);
router.get('/by-user-doctor',verifyToken ,verifyRole(['doctor','patient','nurse'] ), prescriptionController.getPrescriptionsByUserAndDoctor);
router.get('/:id', verifyToken, prescriptionController.getPrescriptionById);
router.post('/create', verifyToken, verifyRole(['doctor']), prescriptionController.createPrescription);
router.put('/:id', verifyToken, verifyRole(['doctor']), prescriptionController.updatePrescription);
router.delete('/:id', verifyToken, verifyRole(['doctor']), prescriptionController.deletePrescription);

module.exports = router;