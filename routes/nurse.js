const router = require('express').Router();
const { verifyToken, verifyRole } = require('../auth/verifytoken');
const nurseController = require('../controllers/nurseController');

router.get('/', verifyToken, nurseController.getAllNurses); 
router.get('/:id', verifyToken, nurseController.getNurseById);
router.put('/:id', verifyToken, verifyRole(['nurse', 'admin']), nurseController.updateNurse);
router.delete('/:id', verifyToken, verifyRole(['nurse', 'admin']), nurseController.deleteNurse)  
router.get('/profile/me', verifyToken, verifyRole(['nurse']), nurseController.getNurseProfile);
 
module.exports = router;     