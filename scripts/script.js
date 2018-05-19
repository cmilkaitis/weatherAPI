$(document).ready(function(){

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){
           
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            let url = 'https://fcc-weather-api.glitch.me/api/current?lon=' + lon + '&lat='+ lat;

            $.getJSON(url, function(obj){
                
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

                let id = obj.weather[0].id;
               
                if (String(id).charAt(0) == 2) {
                    id = "11d";
                } else if (String(id).charAt(0) == 3) {
                    id = "09d";
                } else if (String(id).charAt(0) == 5) {
                    id = "10d";
                } else if (String(id).charAt(0) == 6) {
                    id = "13d";
                } else if (String(id).charAt(0) == 7) {
                    id = "50d";
                } else {
                    id = "01d";
                };
                $("#pic").attr("src", "http://openweathermap.org/img/w/" + id +".png")




            }); 
        });
    } else {
        $("body").html("<h2>You don't have access to location service's. :(</h2>");
    }
});