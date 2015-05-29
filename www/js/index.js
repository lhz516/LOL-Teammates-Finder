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

$().ready(function(){
    
});

$('#signup').on('click', function(){
        io.socket.post("/user", { 
        username: $('#username').val(),
        password: $('#password').val()

    },function(){
        $.mobile.changePage( "#login-page", { transition: "slideup" });
    });

});
$('#login').on('click', function(){
        io.socket.post("/user/login", { 
        username: $('#login-username').val(),
        password: $('#login-password').val()

    },function(data){
        console.log(data);
        //$.mobile.changePage( "#main", { transition: "slideup" });
    });
});
io.socket.on("session-create",function(data){
        console.log('session created');
        console.log(session.User.password);
        //$.mobile.changePage( "#main", { transition: "slideup" });
    });

