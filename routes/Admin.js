const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyRole } = require('../auth/verifytoken');

router.put('/approve-doctor/:id', verifyToken, verifyRole(['admin']), adminController.ApproveDoctor);
router.put('/reject-doctor/:id', verifyToken, verifyRole(['admin']), adminController.RejectDoctor);
router.put('/approve-nurse/:id', verifyToken, verifyRole(['admin']), adminController.ApproveNurse);
router.put('/reject-nurse/:id', verifyToken, verifyRole(['admin']), adminController.RejectNurse);
router.get('/profile', verifyToken, verifyRole(['admin']), adminController.getAdminProfile);
router.put('/profile', verifyToken, verifyRole(['admin']), adminController.updateAdmin);
// router.put('/update-admin-profile', verifyToken, verifyRole(['admin']), adminController.updateAdmin);
// router.delete('/delete-admin-profile', verifyToken, verifyRole(['admin']), adminController.deleteAdmin);
router.get('/pending-doctors', verifyToken, adminController.getPendingDoctors);
router.get('/pending-nurses', verifyToken, adminController.getPendingNurses);


router.get('/approved-doctors', verifyToken, adminController.getApprovedDoctors);
router.get('/approved-nurses', verifyToken, adminController.getApprovedNurses);


router.delete('/remove-doctor/:id', verifyToken, verifyRole((['admin'])), adminController.deleteDoctor);
router.delete('/remove-nurse/:id', verifyToken, verifyRole([ 'admin']), adminController.deleteNurse)




module.exports = router;
