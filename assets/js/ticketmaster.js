/**
 * TicketMasterEvent is a module that populates the main events on the index.html page.
 * This module presents general data about the event.
 */
var TicketMasterEvent = function() {
    
	var apikey = 'tYAxcgGsO5m5yQe4PMj9GTsqYjcAVMwy';

    /**
     * getEventData is an ajax request to ticketmasters Event Search api (https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#search-events-v2)
     * getEventData passes the response to createEventElements if the ajax call is successful
     * TODO: make getEventData recieve a zip code as a query parameter
     */
    function getEventData(event, city, state, zipCode) {
        var event = event || '';
        var city = city || '';
        var state = state || '';
        var zipCode = zipCode || '';

        $.ajax({
            type: "GET",
            url: `https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${event}&city=${city}&state=${state}&postalCode=${zipCode}&apikey=${apikey}`,
            success: function(response) {
                createEventElements(response);
            },
            error: function(xhr, status, err) {
                // we have an error, log it.
                console.log('Error with TicketMasterEvent ' + err);
            }
        });
    }

    /**
     * createEventElements accepts a response from the ajax call, and loops through the events 
     * to create the html divs, then once the div is done looping, append the html elements
     * to the page
     */
    function createEventElements(response) {
        var items = response._embedded.events;
        var html = '';

        items.forEach(function(event) {
            var venueId = event._embedded.venues["0"].id;
            var eventId = event.id;
            var eventName = event.name;
            var eventImage = event.images[0].url;
            var venueName = event._embedded.venues["0"].name;
            var eventDate = event.dates.start.localDate;
            var zip = event._embedded.venues["0"].postalCode;
            html += `
			        <div class="row">
			          <div class="col-md-12 event-item" data-venue-id="${venueId}" data-event-id="${eventId}" data-zip="${zip}" data-date="${eventDate}">
			            <div class="col-md-3 float-left">
			              <img src="${eventImage}">
			            </div>
			            <div class="col-md-6 float-left text-left">
			              <h6>${eventName}</h6>
			              <h4>Venue: ${venueName}</h4>
			              <h6>${eventDate}</h6>
			              <button class="btn btn-venue-details">Venue Details</button>
			              <button class="btn btn-event-details">Event Details</button>
			            </div>
			            <div class="col-md-3 float-left">
			              <h6>weather widget</h6>
                          <button class="btn get-weather">Get Weather</button>
			            </div>
			          </div>
			        </div>
			        <hr>`;
        });
        $('#events').find('.events-list').empty();
        //append our html elements to the events location
        $('#events').find('.events-list').append(html);
    }

    /**
     * clickEventHandlers handles the click events associated with the ticketmaster events api
     * Here we pass values from the search form, to the ajax function getEventData()
     */
    function clickEventHandlers() {
        //on click event for the search form passes event and zipcode to ajax function
        $(document).on('click', '#search', function() {
            var event = $('#search-event').val().trim();
            var city = $('#search-city').val().trim();
            var state = $('#search-state').val().trim();
            var zip = $('#search-zipcode').val().trim();

            getEventData(event, city, state, zip);
        });
    }

    /**
     * init holds the functions we want to run when the TicketMasterEvent module is initialized
     */
    function init() {
        getEventData();
        clickEventHandlers();
    }
    
    /**
     * we assign init to the init function above
     */
    return {
        init: init
    }
}();

//kickoff our TicketMasterEvent feature - call TicketMasterEvent.init();
TicketMasterEvent.init();



/**
 * TicketMasterVenueDetails is a module that creates user experience when the user 
 * clicks on a 'get venue details' button on each individual event.
 * This module will display data about the venue the event is being held at.
 */
var TicketMasterVenueDetails = function() {

    var apikey = 'tYAxcgGsO5m5yQe4PMj9GTsqYjcAVMwy';

    /**
     * getVenueDetailsData is an ajax request to ticketmasters Event Search api (https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#venue-details-v2)
     */
    function getVenueDetailsData(venueId) {
        console.log(venueId);
        $.ajax({
            type:"GET",
            url:`https://app.ticketmaster.com/discovery/v2/venues/${venueId}.json?apikey=${apikey}`,
            success: function(response) {
                createVenueElements(response);
            },
            error: function(xhr, status, err) {
                console.log('Error with TicketMasterVenueDetails ' + err);
            }
        });
    }

    function createVenueElements(response) {
        console.log(response);
        var html = `
            <div>
                ${response.name}
            </div>
        `;
        $('body').append(html);
        // $(this).css('border', '2px solid red');

    }

    /**
     * clickEventHandlers passes the venue id to the ajax call. this is required per ticketmaster documentation.
     */
    function clickEventHandlers() {
        $(document).on('click', '.btn-venue-details', function() {
            var venueId = $(this).parents('.event-item').attr('data-venue-id');
            getVenueDetailsData(venueId);
        });
    }

    /**
     * init holds the functions we want to run when the TicketMasterVenueDetails module is initialized
     */
    function init() {
        clickEventHandlers();
    }

    return {
        init: init
    }

}();

//kickoff our TicketMasterVenueDetails feature - call TicketMasterVenueDetails.init();
TicketMasterVenueDetails.init();



/**
 * TicketMasterEventDetails is a module that creates user experience when the user 
 * clicks on a 'get event details' button on each individual event.
 * This module will display data about the event.
 */
var TicketMasterEventDetails = function() {

    var apikey = 'tYAxcgGsO5m5yQe4PMj9GTsqYjcAVMwy';

    /**
     * getVenueDetailsData is an ajax request to ticketmasters Event Search api (https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/#event-details-v2)
     */
    function getEventDetailsData(eventId) {
        console.log(eventId);
        $.ajax({
            type:"GET",
            url:`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apikey}`,
            success: function(response) {
                console.log(response);
            },
            error: function(xhr, status, err) {
                console.log('Error with TicketMasterEventDetails ' + err);
            }
        });
    }

    /**
     * clickEventHandlers passes the event id to the ajax call. this is required per ticketmaster documentation.
     */
    function clickEventHandlers() {
        $(document).on('click', '.btn-event-details', function() {
            var eventId = $(this).parents('.event-item').attr('data-event-id');
            getEventDetailsData(eventId);
        });
    }

    /**
     * init holds the functions we want to run when the TicketMasterEventDetails module is initialized
     */
    function init() {
        clickEventHandlers();
    }

    return {
        init: init
    }

}();

//kickoff our TicketMasterEventDetails feature - call TicketMasterEventDetails.init();
TicketMasterEventDetails.init();