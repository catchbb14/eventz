
	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyAcyA3p8B00X6r0jQwZC5W1X5g7Q6plzBI",
	    authDomain: "eventz-fd24f.firebaseapp.com",
	    databaseURL: "https://eventz-fd24f.firebaseio.com",
	    projectId: "eventz-fd24f",
	    storageBucket: "",
	    messagingSenderId: "450909265460"
	  };
	  firebase.initializeApp(config);

    var database = firebase.database();

var DatabaseFirebase = function(){



    /**
     * when user submits a new form
     */
    // function submitForm() {
    //     $(document).on('click', '#search', function(event) {
    //         event.preventDefault();
    //         var event = $('#search-event').val().trim();
    //         var city = $('#search-city').val().trim();
    //         var state = $('#search-state').val().trim();
    //         var zip = $('#search-zipcode').val().trim();

    //         database.ref("search/").push({
    //             event: event,
    //             city: city,
    //             state: state,
    //             zip: zip
    //         });
    //     });
    // }

    /**
     * watch updates on database at /trains key
     */
    // function databaseUpdate() {
    //     database.ref('/trains').on('value', function(snapshot) {
    //         var trainTable = $('#train-table').find('tbody');
    //         trainTable.empty();
    //         var keys = Object.keys(snapshot.val());
    //         var trains = snapshot.val();
    //         for (var key in snapshot.val()) {
    //             var trainData = snapshot.val()[key];
    //             var initTime = trainData.trainTime;
    //             var arrivalTime = trainData.frequency;
    //             //calc of minutes away
    //             var initTimeConverted = moment(initTime, "hh:mm");
    //             var diffTime = moment().diff(moment(initTimeConverted), "minutes");
    //             var tRemainder = diffTime % arrivalTime;
    //             var tMinutesTillTrain = arrivalTime - tRemainder;
    //             var html = `
    //               <tr>
    //                 <td class="train">${trainData.train}</td>
    //                 <td class="destination">${trainData.destination}</td>
    //                 <td class="frequency">${trainData.frequency}</td>
    //                 <td class="first-train">${trainData.trainTime}</td>
    //                 <td>${tMinutesTillTrain} minutes</td>
    //                 <td><button type="button" class="btn btn-primary update-train" data-train-id="${key}" data-toggle="modal" data-target="#exampleModal">Update Train</button></td>
    //                 <td><button class="btn btn-danger remove-train" data-train-id="${key}">Remove Train</button></td>
    //               </tr>
    //             `;
    //             trainTable.append(html);
    //         }

    //     }, function(errorObject) {
    //         console.log('the read failed: ' + errorObject.code);
    //     });
    // }

    /**
     * remove train button removes a train from the database and the user interface
     */
    // function removeTrain() {
    //     $(document).on('click', '.remove-train', function(event) {
    //         event.preventDefault();
    //         var trainId = $(this).attr('data-train-id');
    //         database.ref("trains/").child(trainId).remove();
    //     });
    // }

    // function updateTrain() {
    //     $(document).on('click', '.update-train', function() {
    //         var modal = $('#train-modal-form');
    //         var trainId = $(this).attr('data-train-id');
    //         var trainPlaceholder = $(this).parent().siblings('.train').text();
    //         var destinationPlaceholder = $(this).parent().siblings('.destination').text();
    //         var frequencyPlaceholder = $(this).parent().siblings('.frequency').text();
    //         var firstTrainPlaceholder = $(this).parent().siblings('.first-train').text();
    //         $('#train-name-modal').val(trainPlaceholder);
    //         $('#destination-modal').val(destinationPlaceholder);
    //         $('#frequency-modal').val(frequencyPlaceholder);
    //         $('#train-time-modal').val(firstTrainPlaceholder);
    //         modal.attr('data-train-id', trainId);
    //     });
    // }

    // function updateModal() {
    //     $(document).on('click', '#submit-modal', function(event) {
    //         event.preventDefault();
    //         var trainId = $('#train-modal-form').attr('data-train-id');
    //         var train = $('#train-name-modal').val().trim();
    //         var destination = $('#destination-modal').val().trim();
    //         var trainTime = $('#train-time-modal').val().trim();
    //         var frequency = $('#frequency-modal').val().trim();
    //         database.ref("trains/" + trainId).update({
    //             train: train,
    //             destination: destination,
    //             trainTime: moment(trainTime, "h:mm a").format("h:mm a"),
    //             frequency: frequency
    //         });
    //         clearForm();
    //         $('.close').trigger('click');
    //     });
    // }

    function init(){
        // submitForm();
        // databaseUpdate();
        // removeTrain();
        // updateTrain();
        // updateModal();
    }

   return {
      init: init
   }
}();
DatabaseFirebase.init();