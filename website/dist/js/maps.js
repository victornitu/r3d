$(function () {
  // Google maps
  var mapLocation = new google.maps.LatLng(-33.442552,-70.62585310000003);
  var map = new GMaps({
  streetViewControl : false,
  overviewMapControl: false,
  mapTypeControl: false,
  panControl : false,
  scrollwheel: false,
  center: mapLocation,
  el: '#map',
  zoom: 15,
  styles: [
  {
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [
  {
  "color": "#444444"
  }
  ]
  },
  {
  "featureType": "landscape",
  "elementType": "all",
  "stylers": [
  {
  "color": "#f2f2f2"
  }
  ]
  },
  {
  "featureType": "poi",
  "elementType": "all",
  "stylers": [
  {
  "visibility": "off"
  }
  ]
  },
  {
  "featureType": "road",
  "elementType": "all",
  "stylers": [
  {
  "saturation": -100
  },
  {
  "lightness": 45
  }
  ]
  },
  {
  "featureType": "road.highway",
  "elementType": "all",
  "stylers": [
  {
  "visibility": "simplified"
  }
  ]
  },
  {
  "featureType": "road.arterial",
  "elementType": "labels.icon",
  "stylers": [
  {
  "visibility": "off"
  }
  ]
  },
  {
  "featureType": "transit",
  "elementType": "all",
  "stylers": [
  {
  "visibility": "off"
  }
  ]
  },
  {
  "featureType": "water",
  "elementType": "all",
  "stylers": [
  {
  "color": "#c0e4f3"
  },
  {
  "visibility": "on"
  }
  ]
  }
  ]
  });
  map.addMarker({
  position: mapLocation,
  icon: '../images/map-icon.png'
  });
  });