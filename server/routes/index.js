const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');

//router.get('/',storeController.homePage);

//Middleware example
router.get('/',storeController.myMiddleware,storeController.homePage);
router.get('/api/todos',storeController.requestExample);
router.get('/api/reverse/:name',storeController.reverseQueryParameters);
router.post('/api/addStore',storeController.addStore);
router.post('/api/getStore',storeController.getStore);
router.post('/api/:id/editStore',storeController.editStore);
router.post('/api/:id/updateStore',storeController.updateStore);
router.post('/api/getStoresByTag',storeController.getStoresByTag);
router.get('/login',userController.loginForm);
router.get('/register',userController.registerForm);

router.post('/register',userController.validateRegister);

module.exports = router;
