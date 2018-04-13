# Eventz

Eventz is a website that allows a user to search for events based on the event name, city, state or zip code. Venue, event and weather information is displayed to the user in a list format. If the event is within 16 days from the present day, the weather is fetched and displayed for the user. Users also have the ability to see the current weather and 5 day forecast of a city or zip code they search.


## Application Structure
    .
    ├── assets
    │   ├── images
    │   ├── js
    │   │   ├── database.js          # Holds the configuration to our database
    │   │   ├── main.js
    │   │   ├── openweather.js       # OpenWeatherMap module
    │   │   ├── popular-search.js    # Masthead recent/popular search module
    │   │   ├── save-to-favorites.js # Save events to favorites in database module
    │   │   ├── search-validation.js # Validate search form input
    │   │   ├── ticketmaster.js      # Ticketmaster modules
    │   │   └── weatherbit.js        # Weatherbit module
    │   └── stylesheets
    │       └── styles.css           # Styles for the entire site
    ├── index.html                   # The landing page
    └── README.md



## Getting Started

Just `git clone` this repository.


### Coding style

Our application utilizes the revealing modular pattern. This javascript pattern allows us to define all of our functions and variables in the private scope and return an anonymous object with pointers to the private functionality we wish to reveal as public.

This pattern allows the syntax of our scripts to be more consistent. It also makes it more clear at the end of the module which of our functions and variables may be accessed publicly which eases readability.

```
var Module = function(){

   var team = ['Joselyn', 'Eric', 'Jason'];

   function logTeam(){
     return team;
   }

   return {
      start: logTeam
   }
}();
```

Usage
```
Module.start();
```


## Built With

* [OpenWeatherMap API](https://openweathermap.org/api) - For current and 5 day forecast

* [Weatherbit API](https://www.weatherbit.io/api/weather-forecast-16-day) - For 16 day forecast

* [Ticketmaster API](https://developer.ticketmaster.com/products-and-docs/) - For event data

* [Bootstrap](https://getbootstrap.com/) - For html layout and CSS

* [jQuery](https://jquery.com/) - For quicker development

* [jQuery UI](https://jqueryui.com/) - For autocomplete

* [Moment.js](https://momentjs.com/) - For displaying time

* [Font Awesome](https://fontawesome.com/) - For icons

* [Weather Icons](http://erikflowers.github.io/weather-icons/) - For weather icons

* [Isotope](https://isotope.metafizzy.co/) - For filtering events

* [Slick.js](http://kenwheeler.github.io/slick/) - For carousels

* [Lightbox](http://lokeshdhakar.com/projects/lightbox2/) - For image lightboxes

* [Firebase](https://firebase.google.com/) - For database


## Authors

* **Joselyn Sagisi** - *OpenWeatherMap api implementation*

* **Eric Morrow** - *Weatherbit api implementation*

* **Jason Schmitt** - *Ticketmaster api implementation*


## Acknowledgments

* Kudos to anyone who's code was used - we had fun implementing the api's and libraries
* [Free Logo Design](https://www.freelogodesign.org/) for allowing us to grab a logo to use :raised_hands:
* The sun :sunny: for being hot and heating the earth so we can have weather and events
