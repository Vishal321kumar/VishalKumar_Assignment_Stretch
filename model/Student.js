const mongoose = require('mongoose');
const {Schema} = mongoose;

const studentSchema = new Schema({
    name:{type :String, required :true},
    //role and graddate
    gravatar:{type :String},
    techStack:{type :[String]},
    password:{type:String,required :true},
    email:{type:String,required :true},
    location:{type :String},
    fieldOfInterest:{type :String},
    seeking:{type :[String]},
    bio:{type :String},
    githubURL:{type :String},
    twitterURL:{type :String},
    websiteURL:{type :String},
    linkedinURL:{type :String},
    title:{type:String}

})



exports.Student = mongoose.model('Student',studentSchema)