const express = require('express');
const mongoose  = require('mongoose');
const app=express();
const createStudentRoutes = require('./routes/Student');
const loginRoutes = require('./routes/User');
const editStudentRoutes = require('./routes/Student');
const getStudentRoutes = require('./routes/Student');
const deleteStudentRoutes = require('./routes/Student');
const homeRoutes = require('./routes/Student');
const searchRoutes = require('./routes/Student');
const path=require('path')
const cors = require('cors')
require('dotenv').config();








//middleware
app.use(express.static(path.resolve(__dirname,'build')))
app.use(express.json());  // to parse req.body
app.use(cors())






main().catch(err=>console.log(err))

async function main(){
    await mongoose.connect(process.env.DB_URL);
    console.log('db started')
}




app.use('/api/students', createStudentRoutes);
app.use('/api/students', getStudentRoutes);
app.use('/api/students', loginRoutes);
app.use('/api/students', editStudentRoutes);
app.use('/api/students', deleteStudentRoutes);
app.use('/api', homeRoutes); 
app.use('/api', searchRoutes); 




app.listen(8080,()=>{
    console.log('server started')
})