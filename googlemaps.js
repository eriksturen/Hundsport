var map;
var geocoder;
var mapOptions = {
    center: new google.maps.LatLng(0.0, 0.0), zoom: 2,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

function initialize() {
    var myOptions = {
        center: new google.maps.LatLng(40.713955826286046, -73.992919921875),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

}
//This will render map on load
google.maps.event.addDomListener(window, 'load', initialize);