const router = require('express').Router();
const prescriptionController = require('../controllers/prescriptionController');

router.get('/', prescriptionController.getAllPrescriptions);
router.get('/:id', prescriptionController.getPrescriptionById);
router.post('/create', prescriptionController.createPrescription);
router.put('/:id', prescriptionController.updatePrescription);
router.delete('/:id', prescriptionController.deletePrescription);

module.exports = router;