const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create Student Schema

const StudentSchema = new Schema({
    firstname:{
        type:String,
        required:[true,'A student must have a first name']
    },
    lastname:{
        type:String,
        required:[true, 'A student must have a last name']
    },
    phone:{
        type:String,
        required:[true, 'A student must have a Phone Number']
    },
    email:{
        type:String,
        required:[true, 'A student must have an Email Address']
    },
    regno:{
        type:String,
        required:[true, 'A student must have a registration number']
    },
    dateofbirth:{
        type:String,
        required:[true,'A student must a have a birth date']
    },
    department:{
        type:String,
        required:[true,'A student must have a department']
    },
    level:{
        type:String,
        required:[true,'A Student must have a Level']
    }

});

//mow lets crate a model based on this Schema
//this model will create database called students
const Student = mongoose.model ("student",StudentSchema);

//then I will export this model

module.exports =  Student;