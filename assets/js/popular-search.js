
/**
 * PopularSearch is functionality for the masthead section to display most recent searches
 * and themost popular searches that are logged in our firebase database.
 */
var PopularSearch = function() {

    database.ref('/search').on('value', function(snapshot) {
        $('#recent-event-searches').empty();
        $('#popular-event-searches').empty();
        var keys = Object.keys(snapshot.val());
        var mostRecentlySearched = [];
        for (var key in snapshot.val()) {
        	var eventSearched = snapshot.val()[key];
        	mostRecentlySearched.push(eventSearched.event);
        }

        displayMostRecentlySearched(mostRecentlySearched);
        displayMostPopularSearched(mostRecentlySearched);

    }, function(errorObject) {
        console.log('the read failed: ' + errorObject.code);
    });

    /**
     * displayMostRecentlySearched displays the 10 most recent searches from our firebase database
     */
    function displayMostRecentlySearched(mostRecentlySearched) {
        mostRecentlySearched = mostRecentlySearched.reverse();
        mostRecentlySearched.forEach(function( eventSearched, index ) {
        	if(index < 10 && eventSearched !== '') {
	        	var html = `
	        		<button class="btn searches">${eventSearched}</button>
	        	`;
	        	$('#recent-event-searches').append(html);        		
        	}
        });
    }

    /**
     * displayMostPopularSearched takes the most popular search terms out of our firebase database.
     * It displays the top 10 most searched terms in the masthead as buttons.
     */
    function displayMostPopularSearched(mostPopularSearched) {
    	// reduce array into an object with keys with values of how many times the value is in the array
			var findNumberOfTimesSearched = mostPopularSearched.reduce(function (eventSearched, index) { 
			  if (index in eventSearched) {
			    eventSearched[index]++;
			  }
			  else {
			    eventSearched[index] = 1;
			  }
			  return eventSearched;
			}, {});

			// sort the object and return it as an array
			var eventsSorted = Object.keys(findNumberOfTimesSearched).sort(function(a,b){return findNumberOfTimesSearched[a]-findNumberOfTimesSearched[b]});
			//reverse the array so we get the most searched term first
			eventsSorted = eventsSorted.reverse();
			eventsSorted.forEach(function( eventSearched, index ) {
				if(index < 10 && eventSearched !== '') {
					var html = `
						<button class="btn searches">${eventSearched}</button>
					`;
					$('#popular-event-searches').append(html);					
				}
			});
    }

    /**
     * insertValuesIntoFormByButtonClick when the user selects a pre populated button, that value is
     * automatically inserted in the search form for them.
     */
    function insertValuesIntoFormByButtonClick() {
    	$(document).on('click', '.searches', function() {
    		var eventValue = $(this).text().trim();
    		$('#search-event').val(eventValue);
    	});
    };
	
	function init() {
		insertValuesIntoFormByButtonClick();
	}

	return {
		init: init
	}
}();

PopularSearch.init();