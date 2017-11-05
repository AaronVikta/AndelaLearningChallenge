//This app is an express app
const express = require('express');

//i need the express routers
const router = express.Router();

//I need the Student Model, so I require it
const Student = require('../models/studentModel');

router.get('/getOne/:id',function(req,res){
    Student.findOne({_id:req.params.id}).then(function(student){
        res.send(student);
       });
       

});

router.get('/students',function(req,res,next){
    //display all the students
    Student.find({}).then(function(students){
        res.send(students);
    })
    
});

router.post('/register',function(req,res,next){
    
        Student.create(req.body).then(function(student){
            res.send(student); 
        }).catch(next);
    
});



router.put('/edit/:id',function(req,res,next){
    Student.findByIdAndUpdate({_id:req.params.id},req.body).then(function(student){
       //then find the updated guy
       Student.findOne({_id:req.params.id}).then(function(student){
        res.send(student);
       });
       
    });
      //  res.send({type:'Edit'});
    
});

router.delete('/delete/:id',function(req,res,next){
    Student.findByIdAndRemove({_id:req.params.id}).then(function(student){
            res.send(student);
    })
        //res.send({type:'Delete'});
    
 });

 module.exports = router;