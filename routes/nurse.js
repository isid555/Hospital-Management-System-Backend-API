const router = require('express').Router();
const { verifyToken, verifyRole } = require('../auth/verifytoken');
const nurseController = require('../controllers/nurseController');

router.get('/', verifyToken, nurseController.getAllNurses); 
// router.get('/profile', verifyToken, nurseController.getNurseById);
router.put('/profile', verifyToken, verifyRole(['nurse', 'admin']), nurseController.updateNurse);
// router.delete('/profile', verifyToken, verifyRole(['nurse', 'admin']), nurseController.deleteNurse)
router.get('/profile', verifyToken, verifyRole(['nurse']), nurseController.getNurseProfile);
 
module.exports = router;     