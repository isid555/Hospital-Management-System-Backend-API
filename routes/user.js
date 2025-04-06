const router = require('express').Router();
const userController = require('../controllers/userController')
const { verifyToken, verifyRole } = require('../auth/verifytoken')

router.get('/', verifyToken, userController.getAllUsers);
router.put('/profile', verifyToken, verifyRole(['patient']), userController.updateUser);

router.delete('/profile', verifyToken, verifyRole(['admin', 'patient']), userController.deleteUser)
router.get('/profile', verifyToken, verifyRole(['patient']), userController.getUserProfile);
router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;