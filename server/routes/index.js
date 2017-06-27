const express = require('express');
const router = express.Router();

const storeController = require('../controllers/storeController');

//router.get('/',storeController.homePage);

//Middleware example
router.get('/',storeController.myMiddleware,storeController.homePage);
router.get('/api/todos',storeController.requestExample);
router.get('/api/reverse/:name',storeController.reverseQueryParameters);
router.post('/api/addStore',storeController.addStore);
router.post('/api/getStore',storeController.getStore);


module.exports = router;
