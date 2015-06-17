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

var remote_server = 'http://134.154.70.131:1337';


//if you already login last time, you don't need to do it again
$(document).ready(function(){
  var user = JSON.parse(localStorage.getItem("session"));
  if(user==null){
    $.mobile.changePage( "#login-page", { transition: "slideup" });
  }else{
    $('#welcome').html('Welcome, '+ user.username);
    getUserList();
  }
});

//login account (on tap means on touchend)
$('#login').on('tap', function() {
    $.post(remote_server + '/user/login', {
        username: $('#login-username').val(),
        password: $('#login-password').val()
    },function(user){
       localStorage.setItem("session",JSON.stringify(user));
       if(user=="no user")
          $('#login_err').html("No such user!");
       else if(user=="fail")
          $('#login_err').html("Password not match!");
        else if(user.s_name ==""){
       $('#welcome').html('Welcome, '+ user.username);
       $.mobile.changePage( "#edit-info", { transition: "slideup" });
     }else{
      $('#welcome').html('Welcome, '+ user.username);
      getUserList();
     $.mobile.changePage( "#main-page", { transition: "slideup" });
    }
  });
});

//edit user information page
$('#update').on('tap', function(){
    $.post(remote_server + '/user/update', {
        id: JSON.parse(localStorage.getItem("session")).id,
        s_name: $('#s_name').val(),
        rank: $('#rank').val(),
        play_time: $('#play_time').val(),
        ifskype: $('#ifskype').val(),
        language: $('#language').val()
    },function(){
       getUserList();
       $.mobile.changePage( "#main-page", { transition: "slideup" });
   });
});

$('#ifskype').on('change',function(){
  if($('#ifskype').val()=='Yes')
    $('#language').prop('disabled', false);
  else
    $('#language').prop('disabled', true);
});

$('#signup-link').on('tap', function(){
   $.mobile.changePage( "#sign_up", { transition: "slideup" });
});

//get and show users list
function getUserList(){
  $.getJSON(remote_server +'/user/getUsers', function(users){
        $('#userlist').empty();
        users.forEach(function(user) {
          if(user.s_name != ""){  
          //if the user didn't update summoner's name, this user will not on the list
          $('#userlist').append("<div id='" + user.id + 
            "' class='each_user col-xs-12'><ul class='list-unstyled each_user_text'>"+
            "<li id='s_name'><strong>Summoner's Name: </strong>"+user.s_name+"</li>"+
            "<li><strong>Rank: </strong>"+user.rank+"</li>"+
            "<li><strong>Prefer play time: </strong>"+user.play_time+"</li>"+
            "<li><strong>Skype or not: </strong>"+user.ifskype+"</li>"+
            "<li><strong>Language Speaking: </strong>"+user.language+"</li></ul></div>");   
            }   
        });
    });
}

$('#edit_my_profile').on('tap', function() {
  $.mobile.changePage( "#edit-info", { transition: "slideup" });
});

$('#already_have_account').on('tap', function() {
  $.mobile.changePage( "#login-page", { transition: "slideup" });
});

$('#cancel').on('tap', function() {
  getUserList();
  $.mobile.changePage( "#main-page", { transition: "slideup" });
});

$('#logout').on('tap', function() {
  localStorage.clear();
  $.mobile.changePage("#login-page");
});

$('#userlist').on('tap', '.each_user',function() {
  msgId = this.id;
  $.post(remote_server + '/user/findone', {
        id: this.id
    },function(user){
      $('#msgTo').html(user.s_name);
  } );
  $.mobile.changePage("#user-message",{});
});

$('#submitMsg').on('tap', function() {
  var user = JSON.parse(localStorage.getItem("session"));
    $.post(remote_server + '/message', {
        from: user.id,
        to: msgId,
        content: $('#msg').val()
    },function(msg){
      $.mobile.changePage("#main-page",{});
  });
});

$('#myMsg').on('tap', function() {
  console.log('dw');
  var user = JSON.parse(localStorage.getItem("session"));
    $.post(remote_server + '/message/getMsg', {
        id: user.id
    },function(msgs){
      console.log(JSON.stringify(msgs));
      $('#msgList').html(JSON.stringify(msgs));
      $.mobile.changePage("#see-msg",{});
  });
});

$('.back').on('tap',function() {
  $.mobile.changePage("#main-page",{});

});

//sign up form validation
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
      required: "Required",
      minlength: $.validator.format("At least {0} characters required!")
    },
    password:{
      required: "Required"
    },
    password_confirm:{
      required: "Required"
    }
  },
  //submit the form via ajax
  submitHandler: function (){
    $('#signup').on('tap', function() {
    $.post(remote_server + '/user', {
        username: $('#username').val(),
        password: $('#password').val(),     
    },function(){
        $.mobile.changePage( "#login-page", { transition: "slideup" });
    });
});
  },

});