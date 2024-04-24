const express = require('express');
const router = express.Router();
const StudentController = require('../controller/Student');
const { authenticateUser, authorizeEdit } = require('../middleware/middleware');

router.post('/create-student', StudentController.createStudent);
router.get('/get-student-data/:id',StudentController.getStudent);

// router.put('/edit-student/:id', authenticateUser, authorizeEdit, StudentController.editStudent);
// router.put('/edit-student/:id',  StudentController.editStudent);
router.patch('/edit-student/:id',  StudentController.editStudent);


router.delete('/delete-student/:id', StudentController.deleteStudent);
router.get('/home',StudentController.getAllStudents);
router.get('/search', StudentController.getStudentsbySearch);



module.exports = router;
