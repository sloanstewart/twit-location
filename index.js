/* global $ */ // Make Cloud9 happy about jquery junk.
/* global hello */



// GOOGLE MAP MAGIC!
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map;
var marker = null;
var radius = null;
function initMap() {
    
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 33.7700000, lng: -84.3500000}, // Should be close to the center of the universe, er...Atlanta.
    zoom: 10,
    styles:[
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
  });
  infoWindow = new google.maps.InfoWindow;
   
  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
    addRadius(event.latLng);
  });
    
  // Deletes previous marker and adds new marker to the map.
  function addMarker(location) {
      if (marker != null){
          marker.setMap(null);
      }
      marker = new google.maps.Marker({
          position: location,
          map: map,
          draggable: true, // User can drag marker to new position
          title: ''
      });
      marker.setMap(map);
      setCoords();
      $('.search-button').prop('disabled', false);
      marker.addListener('dragend', function(event) {
          setCoords();
      });
  }
    
  function addRadius(location){
      console.info();
      if (radius != null){
          radius.setMap(null);
      }
      radius = new google.maps.Circle({
          strokeColor: '#008596',
          strokeOpacity: 0.25,
          strokeWeight: 2,
          fillColor: '#00bdd6',
          fillOpacity: 0.15,
          map: map,
          center: location,
          radius: Number($('.js-radius').val())
       });
       radius.bindTo("center", marker, "position"); // Radius is bound to Marker
       console.log(radius.radius);
  }
    
  function setCoords () {
      // Get position of marker and round the lat & lng to numbers that work with Instagram API.
      var lat = parseFloat(Math.round(marker.getPosition().lat() * 100) / 100).toFixed(7);
      var lng = parseFloat(Math.round(marker.getPosition().lng() * 100) / 100).toFixed(7);
      console.log('Marker set at '+lat+','+lng);
      $('.js-lat').val(lat);;
      $('.js-lng').val(lng);
  }
}
// NOW LEAVING GOOGLE MAP MAGIC!

function radiusUpdate(val) { // Displays radius value as miles
	var miles = Math.round(val * 0.000621371); // one mile in meters
	$('#js-radius-val').val(miles);
	radius.setRadius(Number(val));
}

var API_URL = 'https://api.twitter.com/1.1/search/tweets.json';
var RESULT_HTML_TEMPLATE = (
  '<div class="result">' +
  	'<div class="js-user-info">' +
  		'<a class="js-profile-picture" href="" target="_blank"></a>' +
  		'<div class="js-user-details">' +
      		'<a class="js-username" href="" target="_blank"></a><br>' +
      	    '<a class="js-screenname" href="" target="_blank"></a>' +
  	    '</div>' +
    '</div>' +
    '<div class="js-image" href="" target="_blank"></div>' +
    '<div class="result-info">' +
        '<p class="js-likes"></p>' +
    	'<p class="js-description"></p>' +
    	'<p class="result-date"><span class="js-date"></span></p>' +
    '</div>' +
  '</div>'
);

// HELLO.JS 
  hello.init({
  	'twitter' : 'mCvOiCxSuf98M1PKd167jLi9y'
  },
  {
  	redirect_uri:'../redirect.html',
  	oauth_proxy: 'https://auth-server.herokuapp.com/proxy'
  });

function login(network){
  console.log('Logging in...');
  // Twitter instance
  var twitter = hello(network);
  // Login
  twitter.login().then( function(r){
  	// Get Profile
  	return twitter.api('me');
  }, log )
  .then( function(p){
  	// Put in page
  	document.getElementById('login').innerHTML = "<img src='"+ p.thumbnail + "' width=50/><br>Logged in as " + p.name;
  	console.log('Login Successful');
  }, log );
  	
  // .then( function(x){
  //   let list = []; // define array
  // 	x.statuses.forEach(function(t){ // loop through each item
  // 	  let data = {
  // 	    timestamp: t.created_at,
  // 	    user: t.user.screen_name,
  // 	    text: t.text,
  // 	  };
  // 	  const html = `
  // 	    <div class="tweet" style="background: #fff; margin: 1em; padding: 1em; border: 1px solid black;">
  // 	    <h4>${data.text}</h4>
  // 	    <p>${data.user} | ${data.timestamp}</p>
  // 	    </div>
  // 	  `;
  // 	  list.push(html); // push tweet html to array
  // 	});
  // 	list.forEach(function(i){ // display data from each tweet in array
  // 	  console.log('data rendered');
  // 	  $('#test').append(i);
  // 	});
  // }, log );
}

function log(){
      		console.log(arguments);
      	}
// leaving HELLO.JS  

function getDataFromApi(lat, lng, rad, callback) {
  var query = {
    q: '',
    geocode: lat+','+lng+','+rad+'km',
    result_type: 'recent',
    count: 5 // Default is 15
  };
  var queryString = 'q='+query.q+'&geocode='+query.geocode+'&count='+query.count;
  // console.log(query); // works
  console.log('Requesting: '+queryString);
  // hello.api([path], [method], [data], [callback(json)]).then(successHandler, errorHandler)
  
  // hello('twitter').api('search/tweets.json?q=javascript&geocode=33.7400000,-84.3900000,5000km&count=5').then(callback);
  hello('twitter').api('search/tweets.json', "get", query).then(callback);
}

function renderResult(result) {
    var template = $(RESULT_HTML_TEMPLATE);
    var time = result.created_at;
    console.log(time);
    // var date = new Date(parseInt(time, 10)*1000);
    template.find(".js-profile-picture").html('<img class="profile-thumbnail" src='+result.user.profile_image_url_https+'>').attr("href", 'https://www.twitter.com/'+result.user.screen_name);
    template.find(".js-username").text(result.user.name).attr("href", 'https://www.twitter.com/'+result.user.screen_name);
    template.find(".js-screenname").text(result.user.screen_name);
    if (result.text != null){
      template.find(".js-description").text(result.text);
    }
    template.find(".js-date").text(time)
  return template;
}

function displayData(data) {
	if (data.statuses.length !== 0){
		console.log('API RESPONSE: \n');
		console.dir(data);
		// display count of posts found
		// $(".js-result-count").text(data.statuses.length+' posts found');
		var results = data.statuses.map(function(item, index) {
				return renderResult(item);
		});
		$('.js-search-results').append(results);
	}
	else {
		console.error('No good data found!');
		$(".js-result-count").text('No posts found in specified area.');
	}
}

function changeLayout() {
  console.log('changing layout');
  // If screen is large, move map to the left and results to the right
  if (document.body.clientWidth >= 1024) {
  	$('main').addClass('main-large');
  	$('.container-left').addClass('container-left-large');
  	$('.container-right').addClass('container-right-large');
  }
  else if (document.body.clientWidth < 1024){
    $('main').removeClass('main-large');
  	$('.container-left').removeClass('container-left-large');
  	$('.container-right').removeClass('container-right-large');
  }
}

function watchButtons() {
  $('#login').click(function(e){
    e.preventDefault();
    login('twitter');
  });
  $('#get-tweets').click(function(e){
    getDataFromApi('33.7400000','-84.3900000','5000', renderResult);
  });
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    $(".js-result-count, .js-search-results").empty(); // Clear count text and results
    var lat = $('.js-lat').val();
    var lng = $('.js-lng').val();
    var rad = $('.js-radius').val();
    getDataFromApi(lat, lng, rad, displayData);
    
    // Scroll to results
		$('html, body').animate({
		  scrollTop: $('.js-search-results').offset().top
		},1000);
	});
}

  $(watchButtons);
  // $(window).resize(changeLayout());