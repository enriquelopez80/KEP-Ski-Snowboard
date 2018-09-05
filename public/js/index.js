$(document).ready(function () {

  //************CLICK LISTENERS:************//
  //****************************************//
  console.log("CONNECTED");
  
  //HOMEPAGE DIVS//
  //*************//
  
  $("#left-mens").on("click", function(event) {
    event.preventDefault()
    let id = $(this).data("attribute");
    $.ajax({
      method: "GET",
      url: `http://localhost:8080/id/${id}`,
      success: (data) => {
        console.log(data)
      }
    }) 
  })
  
  $("#right-womens").on("click", function(event) {
    event.preventDefault()
    let id = $(this).data("attribute");
    $.ajax({
      method: "GET",
      url: `http://localhost:8080/id/${id}`,
      success: (data) => {
        console.log(data)
      }
    }) 
  });
    
  //************UTILS:**************//
  //********************************//
  
    let ajaxGet = (dep, subclass, cb) => {
      let queryURL = `http://localhost:8080/${dep}/${subclass}/`;
      $.ajax({
        method: "GET",
        url: queryURL,
        success: (data) => {
          cb(data, 9)
        }
      })
    }
  
    let logResponse = (array, num) => {
      for (let n = 0; n < num; n++) {
        console.log(array[n]);
      }
    }
  });
  