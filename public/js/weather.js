$(document).ready(function () {
    //declare initial weather object to hold the weather api json data
    let weather = {};
    
    //ajax call to go get data by location
        let getWeather = (location) => {
            let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=afe58f9450b317d57344ebad3f68d672&units=imperial`;
            $.ajax({
              method: "GET",
              url: queryURL,
              success: (data) => {
                weather = data;
                console.log(data);
                renderWeather(weather);
                
              }
            })
          };
     
          //present weather
          getWeather("Mammoth");
          
          //event handlers
          $('#bigBear').on('click', function() {
            console.log('click');
            getWeather("bear%20mountain");
          });
          
          $('#tahoe').on('click', function() {
            console.log('click');
            getWeather("truckee");
          });
          
          $('#breckenridge').on('click', function() {
            console.log('click');
            getWeather("breckenridge");
          });
          
          $('#aspen').on('click', function() {
            console.log('click');
            getWeather("aspen");
          });
    
    
    
    });
    
    //UTILS//
    //redners weather to html
    let renderWeather = (weather) => {
        $('#main-box').html(`
        <h1>${weather.city.name}</h1>
        `)
    
        $('#day1-box').html(`
        <h1>${weather.list[3].weather[0].description}</h1>
        <h1>${weather.list[3].dt_txt}</h1>
        <img src="http://openweathermap.org/img/w/${weather.list[3].weather[0].icon}.png">
        <h1>${weather.list[3].main.temp}</h1>
        `)
    
        $('#day2-box').html(`
        <h2>>${weather.list[10]}</h2>
        <h1>${weather.list[10].dt_txt}</h1>
        <img src="http://openweathermap.org/img/w/${weather.list[10].weather[0].icon}.png">
        <h1>${weather.list[10].main.temp}</h1>
        `)
    
        $('#day3-box').html(`
        <h1>${weather.list[18].weather[0].description}</h1>
        <h1>${weather.list[18].dt_txt}</h1>
        <img src="http://openweathermap.org/img/w/${weather.list[18].weather[0].icon}.png">
        <h1>${weather.list[18].main.temp}</h1>
        `)
    
        $('#day4-box').html(`
        <h1>${weather.list[26].weather[0].description}</h1>
        <h1>${weather.list[26].dt_txt}</h1>
        <img src="http://openweathermap.org/img/w/${weather.list[26].weather[0].icon}.png">
        <h1>${weather.list[26].main.temp}</h1>
        `)
    
        $('#day5-box').html(`
        <h1>${weather.list[34].weather[0].description}</h1>
        <h1>${weather.list[34].dt_txt}</h1>
        <img src="http://openweathermap.org/img/w/${weather.list[34].weather[0].icon}.png">
        <h1>${weather.list[34].main.temp}</h1>
        `)
    
    }
    
    