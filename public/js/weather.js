$(document).ready(function () {
    //declare initial weather object to hold the weather api json data
    let weather = {};
    
    //ajax call to go get data by location
        let getWeather = (location) => {
            let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=afe58f9450b317d57344ebad3f68d672&units=imperial`;
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

          $('#mammoth-active').on('click', function() {
            console.log('click');
            getWeather("Mammoth");
          });
    
    
    
    });
    
    //UTILS//
    //redners weather to html
    let renderWeather = (weather) => {

        let monthDay1 = weather.list[3].dt_txt.split("-");
        let monthDayFixed1 = monthDay1[2].split(" ");
        let monthDay2 = weather.list[11].dt_txt.split("-");
        let monthDayFixed2 = monthDay2[2].split(" ");
        let monthDay3 = weather.list[19].dt_txt.split("-");
        let monthDayFixed3 = monthDay3[2].split(" ");
        let monthDay4 = weather.list[27].dt_txt.split("-");
        let monthDayFixed4 = monthDay4[2].split(" ");
        let monthDay5 = weather.list[35].dt_txt.split("-");
        let monthDayFixed5 = monthDay5[2].split(" ");
      
        $('#main-box').html(`
        <h1>${weather.city.name}</h1>
        `)
    
        $('#day1-box').html(`
        <div class="dayOne">
        <h2 class=capitalize>${weather.list[3].weather[0].description}</h2>
        <h3>${monthDay1[1]}/${monthDayFixed1[0]}</h3>
        <img style="width:150px; height:150px ; border:0;" src="http://openweathermap.org/img/w/${weather.list[3].weather[0].icon}.png">
        <h2>${weather.list[3].main.temp}&#176</h2>
        </div>
        `)
    
        $('#day2-box').html(`
        <div class="dayTwo">
        <h2 class=capitalize>${weather.list[11].weather[0].description}</h2>
        <h3>${monthDay2[1]}/${monthDayFixed2[0]}</h3>
        <a><img style="width:150px;height:150px;border:0;" src="http://openweathermap.org/img/w/${weather.list[11].weather[0].icon}.png"></a>
        <h2>${weather.list[11].main.temp}&#176</h2>
        </div>
        `)
    
        $('#day3-box').html(`
        <div class="dayThree">
        <h2 class=capitalize>${weather.list[19].weather[0].description}</h2>
        <h3>${monthDay3[1]}/${monthDayFixed3[0]}</h3>
        <img style="width:150px;height:150px;border:0;" src="http://openweathermap.org/img/w/${weather.list[19].weather[0].icon}.png">
        <h2>${weather.list[19].main.temp}&#176</h2>
        </div>
        `)
    
        $('#day4-box').html(`
        <div class="dayFour">
        <h2 class=capitalize>${weather.list[27].weather[0].description}</h2>
        <h3>${monthDay4[1]}/${monthDayFixed4[0]}</h3>
        <img style="width:150px;height:150px;border:0;" src="http://openweathermap.org/img/w/${weather.list[27].weather[0].icon}.png">
        <h2>${weather.list[27].main.temp}&#176</h2> 
        </div>
        `)
    
        $('#day5-box').html(`
        <div class="dayFive">
        <h2 class=capitalize>${weather.list[35].weather[0].description}</h2>
        <h3>${monthDay5[1]}/${monthDayFixed5[0]}</h3>
        <img style="width:150px;height:150px;border:0;" src="http://openweathermap.org/img/w/${weather.list[35].weather[0].icon}.png">
        <h2>${weather.list[35].main.temp}&#176</h2>
        </div>
        `)
    
    }
    
    