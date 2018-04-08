var WeatherWidgetEvent = function() {

    var apikey = ['3c2e581fa20c449fa840415d60c0c553', 'b0bca260ee674af3aaa3eedd2febb202'];
    var zipCode = '27606';
    var days = 16;
    

    function getWeatherData() {
        $.ajax({
            type: "GET",
            url: `https://api.weatherbit.io/v2.0/forecast/daily?postal_code=${zipCode}&country=US&days=${days}&key=${apikey[1]}`,
            success: function(response) {
                createWeatherWidget(response.data);
                
            },
            error: function(xhr, status, err) {
                // we have an error, log it.
                console.log('Error with WeatherBitAPI ' + err);
            }
        });
    }

    

    function createWeatherWidget(array) {
        var forecast = array;
        
        console.log(forecast);
        var events = document.getElementsByClassName("event-item");
        //console.log(events);
        Array.prototype.forEach.call(events, function(item) {
            var eventDate = item.children[1].children[2].innerText;
            eventDate = moment(eventDate);
            fifteenDays = moment().add(15, 'days');
            forecastIndex = eventDate.fromNow();
            
            console.log(eventDate.diff(fifteenDays) < 1);
            // if( ) {

            // }
        })
    }


    function init() {
        getWeatherData();
    }

    return {
        init: init
    }

}();

$(document).on('load',WeatherWidgetEvent.init());