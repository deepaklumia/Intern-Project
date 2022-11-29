const express = require('express');
const router = express.Router();
const collegeCollection = require('../controllers/collegeControllers.js');
const internCollection = require('../controllers/internControllers')
router.get('/', function (req, res){
      res.send('server is running on port 3000');
})
router.post('/functionup/colleges',collegeCollection.collegeCollection);
router.post('/functionup/interns',internCollection.internCollection);
router.get('/functionup/collegeDetails',collegeCollection.collegeDetails);

module.exports = router;