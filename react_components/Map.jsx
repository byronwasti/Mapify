var React = require("react");

var customStyle = require('./MapStyle.js')

var directionsDisplay,
    directionsService,
    placesService,
    DEFAULT_LOCATION,
    LatLng;

var Map = React.createClass({

    //something is weird with your tabs and spaces here
	componentWillMount: function(){
		this.customStyle = customStyle;
	},

  componentWillReceiveProps: function(nextProps) {

    var origin = nextProps.route.waypoints[0].name;
    var destination = nextProps.route.waypoints[1].name;
    this.updateRoute(origin, destination);
  },

  updateRoute: function(origin, destination){
    var directionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }

    directionsService.route(directionsRequest, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

          var duration = response.routes[0].legs[0].duration;
          var distance = response.routes[0].legs[0].distance;

          var stats = {
            duration: duration,
            distance: distance
          }

          this.props.updateRouteStats(stats);

          directionsDisplay.setDirections(response);
        }
    }.bind(this));
  },

	componentDidMount: function () {
    var google = this.props.mapService;
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsService = new google.maps.DirectionsService();
    DEFAULT_LOCATION = new google.maps.LatLng(42.2833, -71.2333);
    LatLng = google.maps.LatLng;

    var customMapType = new google.maps.StyledMapType(
    	this.customStyle, {
  		name: 'Custom Style'
		});

		var customMapTypeId = 'custom_style';

		var customStyle = {
			customMapType: customMapType,
			customMapTypeId: customMapTypeId
		}

		var options = {
			zoom: 15,
			center: DEFAULT_LOCATION,
			disableDefaultUI: true,
			mapTypeControlOptions: {
    			mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
 			}
		}

    this.renderMap(options, customStyle);
    placesService = new google.maps.places.PlacesService(this.map);

    // Show initial route
    var origin = this.props.route.waypoints[0].name;
    var destination = this.props.route.waypoints[1].name;

    this.updateRoute(origin, destination)
  },

  renderMap: function (mapOptions, customStyle) {
    var google = this.props.mapService,
      mapCanvas = document.getElementById('map'),
      vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    mapCanvas.style.height = 80 + 'vh';

    this.map = new google.maps.Map(mapCanvas, mapOptions);
    this.map.mapTypes.set(customStyle.customMapTypeId, customStyle.customMapType);
		this.map.setMapTypeId(customStyle.customMapTypeId);

    directionsDisplay.setMap(this.map);
  },

  render: function () {
      return (
          <div id='map' className='route-map'></div>
      );
  }
});

module.exports = Map;
