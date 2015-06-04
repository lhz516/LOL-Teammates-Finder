/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


//  Method of WebSocket

//     $('#signup').on('click', function(){
//         io.socket.post("/user", { 
//         username: $('#username').val(),
//         password: $('#password').val()

//     },function(){
//         $.mobile.changePage( "#login-page", { transition: "slideup" });
//     });

// });
// $('#login').on('click', function(){
//         io.socket.post("/user/login", { 
//         username: $('#login-username').val(),
//         password: $('#login-password').val()

//     },function(data){
//         console.log(data);
//         //$.mobile.changePage( "#main", { transition: "slideup" });
//     });
// });
// io.socket.on("session-create",function(data){
//         console.log('session created');
//         console.log(data.user);
//         $.mobile.changePage( "#main", { transition: "slideup" });
//     });

var remote_server = 'http://localhost:1337';

$('#signup').on('touchstart click', function() {
    $.post(remote_server + '/user', {
        username: $('#username').val(),
        password: $('#password').val(),     
    },function(){
        $.mobile.changePage( "#login-page", { transition: "slideup" });
    });
});

$('#login').on('touchstart click', function() {
    $.post(remote_server + '/user/login', {
        username: $('#login-username').val(),
        password: $('#login-password').val()


    },function(user){
       localStorage.setItem("session",JSON.stringify(user));
       console.log(localStorage.getItem("session"));
       console.log(user.username);
       if(user=="no user"){}
        else{
       $('#welcome').html('Welcome, '+ user.username);
       $.mobile.changePage( "#edit-info", { transition: "slideup" });
     }
    });
       
});

$('#ifskype').on('change',function(){
  if($('#ifskype').val()=='Yes')
    $('#language').prop('disabled', false);
  else
    $('#language').prop('disabled', true);
});

function toMainPage(){
  $.getJSON(remote_server +'/user/getUsers', function(users){
        $('#userlist').empty();
        users.forEach(function(user) {
          $('#userlist').append("<div class='col-xs-12 each_user'><ul class='list-inline'>"+
            "<li><strong>Summoner's Name: </strong>"+user.s_name+"</li>"+
            "<li><strong>Rank: </strong>"+user.rank+"</li>"+
            "<li><strong>Prefer play time: </strong>"+user.play_time+"</li>"+
            "<li><strong>Skype: </strong>"+user.ifskype+"</li>"+
            "<li><strong>Language: </strong>"+user.language+"</li></ul></div>");      
        });
        
    });
       
       $.mobile.changePage( "#main-page", { transition: "slideup" });
}

$('#update').on('touchstart click', function() {
    $.post(remote_server + '/user/update', {
        id: JSON.parse(localStorage.getItem("session")).id,
        s_name: $('#s_name').val(),
        rank: $('#rank').val(),
        play_time: $('#play_time').val(),
        ifskype: $('#ifskype').val(),
        language: $('#language').val()
    },function(){
       toMainPage();
   });
});

$('#edit_my_profile').on('touchstart click', function() {
  $.mobile.changePage( "#edit-info", { transition: "slideup" });
});

$('#cancel').on('touchstart click', function() {
  toMainPage();
});

$('#logout').on('touchstart click', function() {
  localStorage.clear();
  $.mobile.changePage("#sign_up");
});

$('#signup_form').validate({
  rules:{
    username: {
      required: true,
      minlength: 4
    },
    password:{ 
      required: true
    },
    password_confirm:{ 
      required: true,
      equalTo: "#password"
    }
  },
  messages:{
    username: {
      required: "Require username",
      minlength: $.validator.format("At least {0} characters required!")
    }
  }
});