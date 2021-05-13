// Creating a map object
var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 4
  });
// Creating the tile layer that will be the background of our map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 3,
    id: 'mapbox.satellite',
    accessToken: API_KEY
  }).addTo(myMap);

//Adding a new layer to show the earthquakes in terms of magnitude.
var asylumseekers = new L.LayerGroup();

//Using promise with the usage of 'then' method to extract data
d3.csv("../coordinates.csv").then(function(data){
    console.log(data)

//Creating function for color scale based on value
function color(value){

  if (value > 3000000){
      return 'red'
  } else if (value > 1000000){
      return 'orange'
  } else if (value > 500000){
      return 'yellow'
  } else if (value > 250000){
      return 'green'
  } else if (value > 100000){
      return 'blue'
  } else {
      return 'purple'
  }
}
//Creating function for radius of the circle based on the value
function radius(value){
  return value / 5000;
}
//Creating function for style info
function style(feature){
  return{
      opacity: 1,
      fillOpacity: 0.5,
      fillColor: color(feature.values),
      color: "black",
      weight: 0.1,
      stroke: true
      
  };
}
data.map(function (value) {
  L.circle([value.Latitude,value.Longitude], {
    color: color(value.values),
    fillColor: color(value.values),
    fillOpacity: 0.75,
    radius: parseInt(value.values)/4 //500000//
  }).addTo(myMap).bindPopup('<h3>'+"Total: " + value.values + '</h3><hr><h3>'+ "Location: " + value.country+ '<h3>');
}); 

//Setting up the legend
var legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  value = [0, 100000, 250000, 500000, 1000000, 3000000];
  colors = [];

//Adding the range for colors and value
  div.innerHTML += "<h4 style='margin:4px'>Total number of people</h4>"

  for (var i = 0; i < value.length; i++) {
      div.innerHTML += "<i style='background: " + color(value[i] +1) + "'></i> " +
        value[i] + ( value[i + 1] ? "&ndash;" + value[i + 1] + "<br>" : "+");
    }
    return div;
};

//Adding legend to the map
legend.addTo(myMap);

});