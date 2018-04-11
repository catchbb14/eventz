console.log('save to favs.js');

var FavoritesSection = function() {

	/**
	 * whenUserSavesEvent Gets the data from the event and pushes it to firebase
	 */
	function whenUserSavesEvent() {
		var eventName = $(.event-item).attr('data-event-id');

	  database.ref("saved/").push({
	      event: event,
	      city: city,
	      state: state,
	      zip: zip
	  });
	}

	function init() {
		console.log('init');
	}

	return {
		init: init
	}
}();

FavoritesSection.init();