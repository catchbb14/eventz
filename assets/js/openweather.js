console.log('openweather.js')

$(function(){
 
    
    //Global variable for the API key that's being used, https://openweathermap.org/
    var APIKey = '3bce2d04045dd38cbdadc38a931790ac';
    
    //Global variable for the searched zipcode
    var zipcode;
    
    
    //On-click function to pull zipcode from the search input and search API for information
    $('#newButton').click(function (){
     
        zipcode = $('#newInput').val();
        $('#newInput').val('');

        searchOpenWeatherAPI ();
    
    });
    
    
    //Function to search API based on the zipcode and return information
    function searchOpenWeatherAPI () {
              
        //Variables to for URLs that use the API keys, there's one for daily weather and another for five day forecast for every three hours
        var queryURLforecast = 'http://api.openweathermap.org/data/2.5/forecast?zip=' + zipcode + '&appid=' + APIKey; 
        var queryURLweather = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + '&appid=' + APIKey;     

        $.ajax({
            type: "GET",
            url: queryURLweather,
            success: function(currentResponse) {
                createCurrentWeatherElements(currentResponse);
            },
            error: function(xhr, status, err) {
                console.log('Error with SearchOpenWeatherAPI ' + err);
            }
        });

        $.ajax({
            type: "GET",
            url: queryURLforecast,
            success: function(forecastResponse) {
                createForecastWeatherElements(forecastResponse);
                console.log(forecastResponse);
            },
            error: function(xhr, status, err) {
                console.log('Error with SearchOpenWeatherAPI ' + err);
            }
        });
           
    }; 
    

    //Function to pull information for the current weather and print to html
    function  createCurrentWeatherElements(currentResponse) {

        //Empties html at the currentWeather id location
        $('#currentWeather').empty();

        //Variables for the infromation pulled from the API
        var currentWeatherCity = currentResponse.name || 'Data Not Available';
        var currentWeatherZipcode = zipcode || 'Data Not Available';
        var currentWeatherDay = moment.unix(currentResponse.dt).format("ddd") || 'Data Not Available';
        var currentWeatherDate = moment.unix(currentResponse.dt).format("MM/DD") || 'Data Not Available';
        var currentWeatherTemp = Math.round(currentResponse.main.temp - 273.15)  || 'Data Not Available';
        var currentWeatherDescription = currentResponse.weather[0].description || 'Data Not Available';
        var currentWeatherIcon = currentResponse.weather[0].icon || 'Data Not Available';
        var currentWeatherGroup = currentResponse.weather[0].main || 'Data Not Available';

        //Variable for html
        var html = '';

        //Defines html to be appended
        html += `
            <div class="container text-center">
                <div id="icon" class="row">
                    <div class="col-12">
                        <p>${currentWeatherIcon}</p>
                    </div>
                </div>
                
                <div id="weatherInfo" class="row">
                    <div class="col-4">
                        <p>${currentWeatherTemp} &deg;C</p>
                    </div>
                    <div class="col-8">
                        <p>${currentWeatherDescription}</p>
                    </div>
                </div>

                <div id="searchInfo" class="row">
                    <div class="col-4">
                        <p>${currentWeatherDay} ${currentWeatherDate}</p>
                    </div>
                    <div class="col-8">
                        <p>${currentWeatherCity}</p>
                    </div>
                </div>

            </div>
            <hr>`;
                
        //Appends new html to the currentWeather id location
        $('#currentWeather').append(html);
    };

    //Function to pull information for the forecast weather and print to html
    function  createForecastWeatherElements(forecastResponse) {
        
        //Empties html at the currentWeather id location
        $('#forecastWeather').empty();
        
        for (var i = 0; i < forecastResponse.list.length; i= i+8 ) {

            var forecastWeatherDay = moment.unix(forecastResponse.list[i].dt).format("ddd") || 'Data Not Available';
            var forecastWeatherTempHigh = Math.round(forecastResponse.list[i].main.temp_max - 273.15)  || 'Data Not Available';
            var forecastWeatherTempLow = Math.round(forecastResponse.list[i].main.temp_min - 273.15)  || 'Data Not Available';
            var forecastWeatherDescription = forecastResponse.list[i].weather[0].description || 'Data Not Available';
            var forecastWeatherIcon = forecastResponse.list[i].weather[0].icon || 'Data Not Available';
            var forecastWeatherGroup= forecastResponse.list[i].weather[0].main || 'Data Not Available'; 
        
        //Variable for html
        var html = '';
        
        //Defines html to be appended
            html += `
                <div class="container text-center">
                <div class="row">
                    <div id="day" class="col">
                        <div class="col-12">
                            <p>${forecastWeatherDay}</p>
                        </div>
                    </div>
                    <hr>
                    
                    <div id="icon" class="col">
                        <div class="col-12">
                            <p>${forecastWeatherIcon}</p>
                        </div>
                    </div>

                    <div id="HighLow" class="col">
                        <div class="col-12">
                            <p>${forecastWeatherTempHigh} &deg;C / ${forecastWeatherTempLow} &deg;C</p>
                        </div>
                    </div>

                    <div id="Description" class="col">
                        <div class="col-12">
                            <p>${forecastWeatherDescription}</p>
                        </div>
                    </div>
                </div>

                </div>
                <hr>`;

        //Append html to the currentWeather id location
        $('#forecastWeather').append(html);

        };
    };

    //Should this look up by both city and zipcode? 
    //Should this automatically populate by zipcode from the search abover? 
    //Shoudl I just pull this form Eric's API?
    //need to figure out the icons from the current assets file,
    //need to have place holder for icons that arent' listed (if/else)
    //need to upload code to github -- need to ask Jason how to do this
    //

});    
    
    