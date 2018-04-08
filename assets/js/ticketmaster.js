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
            var eventName = event.name;
            var eventImage = event.images[0].url;
            var venueName = event._embedded.venues["0"].name;
            var eventDate = event.dates.start.localDate;
            var zip = event._embedded.venues["0"].postalCode;
            html += `
			        <div class="row">
			          <div class="col-md-12 event-item" data-zip="${zip}" data-date="${eventDate}">
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

//kickoff our TicketMasterEvent feature - call Module.init();
TicketMasterEvent.init();