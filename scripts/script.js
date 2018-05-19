$(document).ready(function(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){
           
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let url = 'https://fcc-weather-api.glitch.me/api/current?lon=' + lon + '&lat='+ lat;

            $.getJSON(url, function(json){
            
                let s = JSON.stringify(json);
                let obj = JSON.parse(s);
                console.log(obj.name);
                console.log(obj.main.temp);
                console.log(obj);

                function toFar(num) {
                    return (num * 1.8) + 32;
                }

                $("#data").html("City: " + obj.name + "<br>Temp: " + obj.main.temp + "<br>" + obj.weather[0].main);
                
            }); 
        });
    } else {
        $("#data").html("<h2>You don't have access to location service's. :(</h2>");
    }
});