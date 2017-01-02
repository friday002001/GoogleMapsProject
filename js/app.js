//Initialize map.
var map;

var initialLocations = [
    {
        name: "Newcastle Golf Course",
        uluru: {lat: 47.5390, lng: -122.1557},
        animated: false,
        showLocation: true
    },
    {
        name: "Redmond Town Center",
        uluru: {lat: 47.6740, lng: -122.1215},
        animated: false,
        showLocation: true
    }
]

var Location = function(data){
    this.name = ko.observable(data.name);
    this.uluru = ko.observable(data.uluru);
    this.marker = ko.observable(data.marker);
    this.animated = ko.observable(data.animated);
    this.showLocation = ko.observable(data.showLocation);
}

var ViewModel = function() {
    var self = this;
    
    InitializeMap();

    this.markerList = ko.observableArray([]);
    this.filter = ko.observable();

    initialLocations.forEach(function(location){
        location.marker = new google.maps.Marker({
            position: location.uluru,
            map: map
        });
        self.markerList.push(location);
    });

    this.search = function(){
        self.markerList().forEach(function(location){
            console.log(location.showLocation);
            location.showLocation = false;
            console.log(location.showLocation);
        });
    }
    
    this.locationClick = function(location){
        //Filter for animated markers.
        var animatedMarkers = self.markerList().filter(
            function(marker){return marker.animated === true;})
        
        //Loop through animated markers and set animation to null.
        for (var i = 0; i < animatedMarkers.length; i++) {
            animatedMarkers[i].animated = false;
            animatedMarkers[i].marker.setAnimation(null);
        }

        //Animate the newly selected marker.
        location.marker.setAnimation(google.maps.Animation.BOUNCE);
        location.animated = true;
    }    
}

var InitializeMap = function(){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 47.5390, lng: -122.1557}
    });
}

ko.applyBindings(new ViewModel())