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





### Branching process


1. Check which branch you're on `git branch`

2. Start on master branch, `git checkout master`

3. Do a `git pull` to get the latest copy of master

4. Create your new branch to code your story, `git checkout -b <branchname>` (Title your branch name the title of the story you're working on, replace spaces with -)

5. Now you're on your own branch. Type `git branch` to see you're on your new branch.

6. Now write your code.

7. Once you're code is done for the story you're working on, add it to your branch and commit it.

8. Type `git status` to see the status of the files you've worked on. (these should be red, because you havent added them yet)

9. To do this, do a `git add .` to add all files.

10. Type `git status` again, you will now see the files are green, which indicates they have been added to your branch.

11. Now make your commit message that says what you did. `git commit -m "your commit message here"`

12. Next, push your code up to the repository, with a `git push origin <branchname>`

13. Once your branch is pushed up, navigate to our repo, and you can see branch under "Your recently pushed branches:". Click on Compare & pull request.

14. On the right hand side, add reviewers to review your pull request. Then click "Create Pull Request"