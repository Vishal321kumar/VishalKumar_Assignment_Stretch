const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Student } = require('../model/Student');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }


      const name = student.name;
      const id =student._id;
        
      
      const token = jwt.sign({ email: student.email }, process.env.SECRET_KEY,{ expiresIn: '1h' });
  
      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(200).json({
        name,id,email,token
      });


  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

