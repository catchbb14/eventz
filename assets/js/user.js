
var loggedInState = "false";


var UserAuthentication = function() {

    function captureInput(form) {
        var email = form.find('#user-email').val().trim();
        var password = form.find('#user-password').val().trim();
        var city = form.find('#user-city').val().trim();
        var state = form.find('#user-state').val(); 

        userApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

            var errorCode = error.code;
            var errorMessage = error.code;

            alert(errorMessage)
            console.log(error);
        });
        
        $('#signupModal').modal('hide');
        
    }

    function authStateListner() {
        userApp.auth().onAuthStateChanged( function(user) {
            if(user) {
                loggedInState = true;
                console.log(user);
            }
        })
    }

    
    
    function clickEventHandlers() {
        'use strict';
        $(document).on('click', '#submitNewUser', function(event) {
            event.preventDefault();
            captureInput($('#sign-up-form'));  
        })
        $(document).on('click', '#signinButton', function(event) {
            event.preventDefault();
            captureInput($('#sign-up-form'));  
        })
    }
    
    function init() {
        clickEventHandlers();
        authStateListner();
    }

    return {
        init: init
    }

}();

UserAuthentication.init();

