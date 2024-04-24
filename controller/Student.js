// const { Student } = require("../model/Student");

// exports.createStudent = async (req,res)=>{

//     const student = new Student(req.body)
//     try{
//        const doc = await student.save();
//        res.status(201).json(doc);
//     }
//     catch(err){
//        res.status(400).json(err);
//     }
//    };




//    exports.fetchStudents = async (req,res)=>{

//     // const student = new Student(req.body)


//     let condition = {}
//     let query = Student.find(condition);
//     // let query = Student.find({name : req.query.name});



//     // query=query.find({category : req.query.category});   


//     try{
//     //    const doc = await Student.find();
//        const doc = await query.exec();
//        res.status(201).json(doc);
//     }
//     catch(err){
//        res.status(400).json(err);
//     }
//    };





//    exports.fetchStudents = async (req,res)=>{

//     let condition = {}
 
//      let query = Student.find(condition);
//      let totalProductsQuery = Product.find(condition);
 
//      if(req.query.category){
//          query=query.find({location : req.query.location});
//          totalProductsQuery=totalProductsQuery.find({category : req.query.category});
//      }
//      if(req.query._sort && req.query._order){
//          query=query.sort({[req.query._sort]:req.query._order});
//      }
 
//      try{
//          const doc = await query.exec();
//          res.status(200).json(doc);
//      }
//      catch(err){
//         res.status(400).json(err);
//      }
//     };
 









// signupController.js
const bcrypt = require('bcrypt');
const { Student } = require('../model/Student');

exports.createStudent = async (req, res) => {
  const {
    name,
    email,
    password,
    gravatar,
    techStack,
    location,
    fieldOfInterest,
    seeking,
    bio,
    githubURL,
    twitterURL,
    websiteURL,
    linkedinURL,
    title
  } = req.body;

  try {
    // Check if student with same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create new student
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await Student.create({
      name,
      email,
      password: hashedPassword,
      gravatar,
      techStack,
      location,
      fieldOfInterest,
      seeking,
      bio,
      githubURL,
      twitterURL,
      websiteURL,
      linkedinURL,
      title
    });

    res.status(201).json({ message: 'Student created successfully', student: newStudent });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.editStudent = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Find student by ID
    const student = await Student.findByIdAndUpdate(id, updatedData, { new: true });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getAllStudents = async (req, res) => {
   try {
      let students;
      const { search } = req.query;
 
      // If there's a search query, filter students by name, title, or tech stack
      if (search) {
        students = await Student.find({
          $or: [
            { name: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by name
            { bio: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by title
            { techStack: { $regex: new RegExp(search, 'i') } } // Case-insensitive search by tech stack
          ]
        });
      } else {
        // If no search query provided, fetch all students
        students = await Student.find();
      }
 
      res.json(students);
   } catch (error) {
     console.error('Error fetching students:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 };

 exports.getStudentsbySearch = async (req, res) => {
   try {
     let students;
     const { search } = req.query;

     // If there's a search query, filter students by name, title, or tech stack
     if (search) {
       students = await Student.find({
         $or: [
           { name: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by name
           { title: { $regex: new RegExp(search, 'i') } }, // Case-insensitive search by title
           { techStack: { $regex: new RegExp(search, 'i') } } // Case-insensitive search by tech stack
         ]
       });
     } else {
       // If no search query provided, fetch all students
       students = await Student.find();
     }

     res.json(students);
   } catch (error) {
     console.error('Error fetching students:', error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
};



exports.getStudent =async (req, res) => {
  const { id } = req.params;

  try {
    // Find student by ID
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);

  } catch (error) {
    console.error('Error fetching student by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






 // deleteStudentController.js

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure user can only delete their own profile
   //  if (req.user.id !== id) {
   //    return res.status(403).json({ message: 'You are not authorized to delete this profile' });
   //  }

    // Delete student
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


 
