const router = require('express').Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyRole } = require('../auth/verifytoken');

router.put('/approve-doctor/:id', verifyToken, verifyRole(['admin']), adminController.ApproveDoctor);
router.put('/reject-doctor/:id', verifyToken, verifyRole(['admin']), adminController.RejectDoctor);
router.put('/approve-nurse/:id', verifyToken, verifyRole(['admin']), adminController.ApproveNurse);
router.put('/reject-nurse/:id', verifyToken, verifyRole(['admin']), adminController.RejectNurse);
router.get('/profile', verifyToken, verifyRole(['admin']), adminController.getAdminProfile);
router.put('/update-admin-profile', verifyToken, verifyRole(['admin']), adminController.updateAdmin);
router.delete('/delete-admin-profile', verifyToken, verifyRole(['admin']), adminController.deleteAdmin);


module.exports = router;
