



var UserAuthentication = function() {

    function captureInput(form) {
        var email = form.find('#user-email').val().trim();
        var password = form.find('#user-password').val().trim();
        var city = form.find('#user-city').val().trim();
        var state = form.find('#user-state').val(); 

        userApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.code;
        });
        return !false;
    }
    
    function clickEventHandlers() {
        'use strict';
        $(document).on('click', '#submitNewUser', function(event) {
            if(captureInput($('#sign-up-form'))) {
                
            }  
        })
    }
    
    function init() {
        clickEventHandlers();
    }

    return {
        init: init
    }

}();

UserAuthentication.init();

