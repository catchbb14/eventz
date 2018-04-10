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
        var items = (typeof response._embedded != 'undefined') ? response._embedded.events : false;
        var html = '';
        var isotopesArray = [];
        var isotopeHTML = '';
        //if there are event items, create events
        if(items !== false) {
            items.forEach(function(event) {
                var venueId = event._embedded.venues["0"].id || 'Data Not Available';
                var eventId = event.id || 'Data Not Available';
                var eventName = event.name || 'Data Not Available';
                var eventImage = event.images[0].url || 'Data Not Available';
                var venueName = event._embedded.venues["0"].name || 'Data Not Available';
                var eventDate = event.dates.start.localDate || 'Data Not Available';
                var zip = event._embedded.venues["0"].postalCode || 'Data Not Available';
                //some events don't have classifications, this checks to see if there is classifications to get the segment name and replaces special characters and spaces so they can be used as classes
                if (typeof event.classifications !== "undefined") {
                    var classifications = event.classifications;
                    var isotopes = classifications["0"].segment.name;
                    isotopes = isotopes.replace("&", "and");
                    isotopes = isotopes.replace(/\s+/g, '-')
                }

                //if the isotopesArray does not include the isotope, add it to the array and create a button
                if(!isotopesArray.includes(isotopes)) {
                    //if its the first item, add the all button to be able to view all filters
                    if(isotopesArray.length === 0) {
                        isotopesArray.push('*');
                        isotopeHTML += `
                            <button class="btn category-button" data-filter="*">View All</button>
                        `;
                    }
                    isotopesArray.push(isotopes);
                    isotopeHTML += `
                        <button class="btn category-button" data-filter=".${isotopes}">${isotopes}</button>
                    `;
                }

                html += `
                        <div class="event-item-isotope row ${isotopes}" id="${eventId}">
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
                            <div class="col-md-3 float-left text-center weather-widget">
                              <span style="font-size:50px;"><i class="wi wi-horizon-alt"></i></span><br>
                              <button class="btn get-weather">Get Weather</button>
                            </div>
                          </div>
                            <div class="venue col-md-12"></div>
                            <div class="event col-md-12"></div>
                        </div>

                        `;
            });            
        } else {
            html += `
                <div>Oh no! No search results were found for that search criteria. :(</div>
            `;
        }

        $('#category-buttons').empty();
        $('#category-buttons').append(isotopeHTML);
        $('#events').find('.events-list').empty();
        //append our html elements to the events location
        $('#events').find('.events-list').append(html);
        $('.events-list').isotope('destroy');
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

            clearForm();

            database.ref("search/").push({
                event: event,
                city: city,
                state: state,
                zip: zip
            });

            getEventData(event, city, state, zip);
        });

        // when the user clicks the close tab
        $(document).on('click', '.close-tab', function() {
            $(this).parents('.details').remove();
        });

        //when the user clicks on a category button - this is the isotope functionality
        $(document).on('click', '.category-button', function() {
            var filter = $(this).attr('data-filter');
            
            $('.events-list').isotope({
                filter: filter
            });
        });
    }

    /**
     * clearForm clears the form after the submit button has been searched
     */
    function clearForm() {
        $('#search-event, #search-city, #search-state, #search-zipcode').val('');
    }

    /**
     * init holds the functions we want to run when the TicketMasterEvent module is initialized
     */
    function init() {
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
    function getVenueDetailsData(venueId, theEvent) {
        $.ajax({
            type:"GET",
            url:`https://app.ticketmaster.com/discovery/v2/venues/${venueId}.json?apikey=${apikey}`,
            success: function(response) {
                createVenueElements(response, theEvent);
            },
            error: function(xhr, status, err) {
                console.log('Error with TicketMasterVenueDetails ' + err);
            }
        });
    }

    /**
     * createVenueElements creates the venue html associated with that event
     * Gives information such as parking, box office info, address, link to the venue etc.
     */
    function createVenueElements(response, theEvent) {

        var targetDivId = theEvent.siblings('.venue');
        var venue = response;
        var address = venue.address.line1 || 'Data Not Available';
        var city = venue.city.name || 'Data Not Available';
        var state = venue.state.stateCode || 'Data Not Available';
        var zipCode = venue.postalCode || 'Data Not Available';
        var name = venue.name || 'Data Not Available';
        var boxOffice = venue.boxOfficeInfo || 'Data Not Available';
        var boxOfficeHours = boxOffice.openHoursDetail || 'Data Not Available';
        var paymentDetails = boxOffice.acceptedPaymentDetail || 'Data Not Available';
        var parkingDetails = venue.parkingDetail || 'Data Not Available';
        var url = venue.url;
        var html = `
                    <div class="details">
                        <h4 class="text-center">${name} Venue Details</h4>
                        <div class="close-tab">close</div>
                        <div class="col-md-3 float-left text-center">
                            <div class="title">Address</div>
                            <div>${address}</div>
                            <div>${city}, ${state} ${zipCode}</div>
                        </div>
                        <div class="col-md-3 float-left text-center text-left">
                            <div class="title">Parking</div>
                            <div class="ellipsis">${parkingDetails}</div>
                        </div>
                        <div class="col-md-3 float-left text-center">
                            <div class="title">Links</div>
                            <div><a href="${url}" target="_blank">${name}</a></div>
                        </div>
                        <div class="col-md-3 float-left text-center">
                            <div class="title">Box Office Info</div>
                            <div class="ellipsis">${boxOfficeHours}</div>
                            <div class="ellipsis">${paymentDetails}</div>
                        </div>
                    </div>
        `;
        targetDivId.append(html);
    }

    /**
     * clickEventHandlers passes the venue id to the ajax call. this is required per ticketmaster documentation.
     */
    function clickEventHandlers() {
        $(document).on('click', '.btn-venue-details', function() {
            var venueId = $(this).parents('.event-item').attr('data-venue-id');
            var theEvent = $(this).parents('.event-item');
            //empty the div before making another ajax call
            $(this).parents('.event-item').siblings('.venue').empty();
            getVenueDetailsData(venueId, theEvent);
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
    function getEventDetailsData(eventId, theEvent) {
        $.ajax({
            type:"GET",
            url:`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apikey}`,
            success: function(response) {
                createEventElements(response, theEvent);
            },
            error: function(xhr, status, err) {
                console.log('Error with TicketMasterEventDetails ' + err);
            }
        });
    }

    /**
     * createEventElements creates the event html associated with that event
     * Gives information such as ...
     */
    function createEventElements(response, theEvent) {

        var targetDivId = theEvent.siblings('.event');
        var event = response;
        var eventId = event.id;
        var prices = event.priceRanges || 'Data Not Available';
        var maxPrice = prices["0"].max || 'Data Not Available';
        var minPrice = prices["0"].min || 'Data Not Available';
        var status = event.dates.status.code || 'Data Not Available';
        var timezone = event.dates.timezone || 'Data Not Available';
        var name = event.name || 'Data Not Available';
        var images = event.images || 'Data Not Available';
        var seatMap = (typeof event.seatmap != 'undefined') ? event.seatmap.staticUrl : 'http://via.placeholder.com/200x200';
        var genreName = event.classifications["0"].genre.name || 'Data Not Available';
        var segmentName = event.classifications["0"].segment.name || 'Data Not Available';
        var date = event.dates.start.localDate || 'Data Not Available';
        var time = event.dates.start.localTime || 'Data Not Available';
        
        var eventDate = moment(date);
        var currentDate = moment().format();
        var daysFromNow = moment(eventDate).diff(moment(currentDate), 'days');
        var timeRemaining = '';
        if(daysFromNow > 0) {
            timeRemaining += `<div>Only ${daysFromNow} days remaining!</div>`; 
        } else {
            timeRemaining += "<div>It's today, hope you're ready!</div>"
        }
        var html = `
                    <div class="details">
                        <h4 class="text-center">${name} Event Details</h4>
                        <div class="close-tab">close</div>
                        <div class="col-md-3 float-left text-center">
                            <div class="title">Tickets</div>
                            <div>Currently ${status}</div>
                            <div>$${minPrice} - $${maxPrice}</div>
                            <div></div>
                        </div>
                        <div class="col-md-3 float-left text-center text-left">
                            <div class="title">General Info</div>
                            <div>${genreName}</div>
                            <div>${segmentName}</div>
                        </div>
                        <div class="col-md-3 float-left text-center">
                            <div class="title">Seat Map</div>
                            <div>
                                <a href="${seatMap}" data-lightbox="${eventId}" data-title="${name}">
                                    <img class="seatmap"  src="${seatMap}">
                                </a>
                            </div>
                            
                        </div>
                        <div class="col-md-3 float-left text-center">
                            <div class="title">Days Until the Event</div>
                            ${timeRemaining}
                            <div class="text-center">
                                The event is on ${moment(date).format('ddd, MMM Do')} at
                                ${moment(time, 'HH:mm:ss').format("h:mm a")}.
                            </div>
                        </div>
                    </div>
        `;
        targetDivId.append(html);
    }

    /**
     * clickEventHandlers holds on click event handlers
     */
    function clickEventHandlers() {
        // pass eventId and the list item event to the ajax call
        $(document).on('click', '.btn-event-details', function() {
            var eventId = $(this).parents('.event-item').attr('data-event-id');
            var theEvent = $(this).parents('.event-item');
            //empty the div before making another ajax call
            $(this).parents('.event-item').siblings('.event').empty();
            getEventDetailsData(eventId, theEvent);    
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