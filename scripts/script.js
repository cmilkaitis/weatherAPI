$(document).ready(function(){

    if(navigator.geolocation){
      
        function sendData(lat, long){
            $("#data").html("<h2>Latitude: </h2>" + lat + "<br><h2>Longitude: </h2>" + long);
        };

        navigator.geolocation.getCurrentPosition(function(position){
            //sendData(position.coords.latitude, position.coords.longitude);

            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let url = 'https://fcc-weather-api.glitch.me/api/current?lon=' + lon + '&lat='+ lat;

            $.getJSON(url, function(json){
                let html = "xx";

                json.forEach(val => {
                    let keys = Object.keys(val);
                    html += "<div class='info'>";
                    keys.forEach(key => {
                        html += "<strong>" + key + "</strong>: " + val[key] + "<br>";
                    });
                    html += "</div><br>"
                });

                $("#data").html(html);
            }); 
        });
    } else {
        $("#data").html("<h2>You don't have access to location service's. :(</h2>");
    }
});