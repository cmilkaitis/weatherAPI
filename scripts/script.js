$(document).ready(function(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){
           
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let url = 'https://fcc-weather-api.glitch.me/api/current?lon=' + lon + '&lat='+ lat;

            $.getJSON(url, function(json){
            
                let s = JSON.stringify(json);
                let obj = JSON.parse(s);
                $("#city").html("What's it like in " + obj.name + " today?");
                $("#temp").html(parseInt(toFer(obj.main.temp)) + "&#8457; with " + titleCase(obj.weather[0].description));
    
                function toFer(num) {
                    return (num * 1.8) + 32;
                }

                let toggled = true;
                $("button").click(function(){
                    
                    if (!toggled){
                        toggled = true;
                        $("#temp").html(parseInt(toFer(obj.main.temp)) + "&#8457; with " + titleCase(obj.weather[0].description));
                    } else {
                        toggled = false;
                        $("#temp").html(parseFloat(obj.main.temp).toFixed(1) + "&#8451; with " + titleCase(obj.weather[0].description));
                    }
                });
    
                function titleCase(str) {
                    return str.toLowerCase()
                              .split(" ")
                              .map(word => { return word.replace(word.charAt(0), word.charAt(0).toUpperCase());}).join(" "); 
                }
            }); 
        });
    } else {
        $("body").html("<h2>You don't have access to location service's. :(</h2>");
    }
});