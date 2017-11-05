$(document).ready(function(){
//registation of students was taken care of
    $("#register").click(function(e){

        //prevent default behaviour
        e.preventDefault();

        //catches the students details from the form
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var regno = $("#regno").val();
        var dept = $("#dept").val();
        var level = $("#level").val();
        var datepicker = $("#datepicker").val();

        //basic validation
        if(((fname==''||lname=='')||(email==''||phone==''))||((regno ==''|| dept== '')||(level== ''||datepicker == '')))
        
        {

            $("#result").fadeIn(3000, function(){						
            $("#result").html('<div class="alert alert-info"> Please fill all fields</div>');
            });	
        }
        else
        {
            // prepares the data in json format
            var newStudent = {
                'firstname':fname,
                'lastname':lname,
                'email': email,
                'phone':phone,
                'regno':regno,
                'department':dept,
                'level':level,
                'dateofbirth':datepicker
            };

            
            //call ajax to post the request
            $.ajax({
                type: 'POST',
                data: JSON.stringify(newStudent),
                url: '/register',
                contentType:"application/json; charset=utf-8",
                dataType: 'JSON',

                success:function(student){
					
					$("#result").fadeIn(3000, function(){						
					$("#result").html('<div class="alert alert-success"> '+student.firstname+' successfully registered</div>');
                    //reset the form, to accept new student
                    $('#register-form')[0].reset();

                    });	
                },
                error:function(error){
                    $("#result").fadeIn(3000, function(){						
                        $("#result").html('<div class="alert alert-danger"> '+error+' </div>');
                        });	

                }


            });
           

        }
       
        
    });

});

//here i pulled all the students
// jQuery AJAX call for JSON
$.getJSON( '/students', function( data ) {
    var Content = '';
    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
        
   
    Content +=  '<div class="w3layouts_main_grid col-md-5  col-md-offset-1">';	
    Content +=		'<form id="register-form" class="w3_form_post">';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>First Name </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.firstname+'  '+ this.lastname +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>Reg No </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.regno +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>Phone </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.phone +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>Email </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.email +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>Department </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.department +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>Level </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.level +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>Date of Birth </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.dateofbirth +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
    Content +=				'<span class="agileits_grid">';
    Content +=				'<label>Reg No </label>';
    Content +=					'<input type="text" disabled="" placeholder="'+this.regno +'" >';
    Content +=				'</span>';
    Content +=			'</div>';

    Content +=	        '<div class="w3_main_grid">';
    Content +=				'<div class="w3_main_grid_right">';
    Content +=					'<input type="submit" value="Edit Student" data-id="'+this._id +'" id="edit">';
    Content +=					'<input type="button" class=" btn btn-danger"data-id="'+this._id +'" value="Delete Student" onclick emeka(); id="delete">';
    Content +=				'</div>';
    Content +=			'</div>';


    Content +=      ' </form>';
    Content +=  '</div>';
        
            });

    // Inject the whole content string into our existing HTML div
    $('#getStudents').html(Content);
});


//here delete was handled
$(document).on('click', '#delete', function(e){

    e.preventDefault();
    var id = $(this).data('id');
    var confirmed= confirm("This student will be deleted, do you want to continue");
    if(confirmed===true){
        //call ajax to post the request
        $.ajax({
            type: 'DELETE',
            url: '/delete/'+id,

            success:function(student){
                					
                alert(student.firstname+' was successfully Deleted');
            
            },
            error:function(error){					
                alert(student.firstname+' could not Deleted');
            }


        });
    }
    else{
        alert ('Student was not deleted');
    } 
   
});


//editing of student was taken care of, I displayed the student to be edited here
$(document).on('click', '#edit', function(e){
    
    e.preventDefault();
    var id = $(this).data('id');
  
        //call ajax to post the request
        $.ajax({
            type: 'GET',
            url: '/getOne/'+id,

            success:function(student){
                var Content = '';					
                Content +=  '<div class="w3layouts_main_grid">';	
                Content +=		'<form id="register-form" class="w3_form_post">';
            
                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=				'<span class="agileits_grid">';
                Content +=				'<label>First Name </label>';
                Content +=					'<input type="text"  id="fname"  value="'+student.firstname+'" >';
                Content +=				'</span>';
                Content +=			'</div>';

                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=				'<span class="agileits_grid">';
                Content +=				'<label>Last Name </label>';
                Content +=					'<input type="text" id="lname" value="'+student.lastname+'" >';
                Content +=				'</span>';
                Content +=			'</div>';

                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=				'<span class="agileits_grid">';
                Content +=				'<label>Student Email </label>';
                Content +=					'<input type="text" id="email"  value="'+student.email+'" >';
                Content +=				'</span>';
                Content +=			'</div>';

                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=				'<span class="agileits_grid">';
                Content +=				'<label>Phone No </label>';
                Content +=					'<input type="text" id="phone"  value="'+student.phone+'" >';
                Content +=				'</span>';
                Content +=			'</div>';

                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=				'<span class="agileits_grid">';
                Content +=				'<label>Registration No </label>';
                Content +=					'<input type="text" id="regno" value="'+student.regno+'" >';
                Content +=				'</span>';
                Content +=			'</div>';

                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=				'<span class="agileits_grid">';
                Content +=				'<label>Department </label>';
                Content +=					'<input type="text" id="dept"  value="'+student.department+'" >';
                Content +=				'</span>';
                Content +=			'</div>';

                Content +=                   '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=                    '<span class="agileits_grid">';
                Content +=                      '<label>Select Level </label>';
                Content +=                      '<select id="level"  value="'+student.level+'">';
                Content +=                           '<option  value="'+student.level+'" selected="" disabled=""> '+student.level+' Level</option>';
                Content +=                           '<option value="100">100 Level</option>';
                Content +=                           '<option value="200">200 Level</option>';
                Content +=                           '<option value="300">300 Level</option>';
                Content +=                           '<option value="400">400 Level</option>';
                Content +=                           '<option value="500">500 Level</option>';
                Content +=                           '<option value="600">600 Level</option>';
                Content +=                       '</select>';
                Content +=                      '</span>';
                Content +=                    '</div>';

                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid">';
                Content +=				'<span class="agileits_grid">';
                Content +=				'<label>Date of Birth </label>';
                Content +=						'<div class="agileits_w3layouts_main_gridl">';
                Content +=							'<input class="date" id="datepicker" ref="datee" type="text" value="'+ student.dateofbirth+'"   required="">';
                Content +=						'</div>';						
                Content +=						'<div class="clear"> </div>';
                Content +=               '</span>';
                Content +=           '</div>';

                Content +=	        '<div class="w3_agileits_main_grid w3l_main_grid" id="result">';
                Content +=          '</div>';

                Content +=	        '<div class="w3_main_grid">';
                Content +=				'<div class="w3_main_grid_right">';
                Content +=					'<input type="submit" value="Update Details" data-id="'+student._id +'" id="update">';
                Content +=					'<input type="submit" class=" btn btn-info" value="Back">';
                Content +=				'</div>';
                Content +=			'</div>';

                Content +=         '</form>';
                Content +=       '</div>';
                
                 // Inject the whole content string into our existing HTML div after clearing it
                 $('#getStudents').html('');
                 $('#getStudents').html(Content);
               
            },
            error:function(error){					
                alert('An unknown error occured');
            }


        });
  
   
});


//On successfull edition, this student will be updated
$(document).on('click', '#update', function(e){
    
            //prevent default behaviour
            e.preventDefault();
            var id = $(this).data('id');
            //catches the students details from the form
            var fname = $("#fname").val();
            var lname = $("#lname").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var regno = $("#regno").val();
            var dept = $("#dept").val();
            var level = $("#level").val();
            var datepicker = $("#datepicker").val();
    
            //basic validation
            if(((fname==''||lname=='')||(email==''||phone==''))||((regno ==''|| dept== '')||(level== ''||datepicker == '')))
            
            {
    
                $("#result").fadeIn(3000, function(){						
                $("#result").html('<div class="alert alert-info"> Please fill all fields</div>');
                });	
            }
            else
            {
                // prepares the data in json format
                var editedValues = {
                    'firstname':fname,
                    'lastname':lname,
                    'email': email,
                    'phone':phone,
                    'regno':regno,
                    'department':dept,
                    'level':level,
                    'dateofbirth':datepicker
                   
                };
    
                
                //call ajax to post the request
                $.ajax({
                    type: 'PUT',
                    data: JSON.stringify(editedValues),
                    url: '/edit/'+id,
                    contentType:"application/json; charset=utf-8",
                    dataType: 'JSON',
    
                    success:function(student){
                        
                        $("#result").fadeIn(3000, function(){						
                        $("#result").html('<div class="alert alert-success"> '+student.firstname+' details successfully updated</div>');
                        });	
                    },
                    error:function(error){
                        $("#result").fadeIn(3000, function(){						
                            $("#result").html('<div class="alert alert-danger"> '+error+' </div>');
                            });	
    
                    }
    
    
                });
               
    
            }

 });
    