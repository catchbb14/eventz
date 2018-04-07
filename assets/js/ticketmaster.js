var TicketMasterEvent = function() {
    console.log('TicketMasterEvent');
    //private functions
    function getEventData() {
        //TODO make postal code dynamic
        $.ajax({
            type: "GET",
            url: "https://app.ticketmaster.com/discovery/v2/events.json?size=10&postalCode=27606&apikey=tYAxcgGsO5m5yQe4PMj9GTsqYjcAVMwy",
            success: function(response) {
                logEventData(response);

                // Parse the response.
                // Do other things.
                // passing the response to other functions
            },
            error: function(xhr, status, err) {
                // This time, we do not end up here!
            }
        });
    }

    function logEventData(response) {
    		//initial read in of the data for the list items.
    		//TODO: create template for the list, and append the list to the page
        var items = response._embedded.events;
        items.forEach(function(event) {
        		// console.log(event);
          //   console.log(event.name);
          //   console.log(event.images[0].url);
          //   console.log(event._embedded.venues["0"].name);
          //   console.log(event.dates.start.localDate);
        });
    }
    //call functions that should run on initialize
    function init() {
        getEventData();
    }
    //return init, assign init to the init function
    return {
        init: init
    }
}();

//kickoff our TicketMasterEvent feature - call Module.init();
TicketMasterEvent.init();


