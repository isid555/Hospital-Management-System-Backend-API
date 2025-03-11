const router = require('express').Router();
const nurseController = require('../controllers/nurseController');

router.get('/', nurseController.getAllNurses); 
router.get('/:id', nurseController.getNurseById);
router.put('/:id', nurseController.updateNurse);
router.delete('/:id', nurseController.deleteNurse)  
 
module.exports = router;     