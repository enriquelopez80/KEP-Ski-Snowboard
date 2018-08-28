$(document).ready(function () {

//************CLICK LISTENERS:************//
//****************************************//

//HOMEPAGE DIVS//
//*************/

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
})

//NAVBAR LINKS//
//*************/

  //MENS//
  $("#mensJackets").on("click", function (event) {
    event.preventDefault();
    ajaxGet("mens", "jackets", logResponse)
  })
  $("#mensFleece").on("click", function (event) {
    event.preventDefault();
    ajaxGet("mens", "fleece", logResponse)
  })
  $("#mensVests").on("click", function (event) {
    event.preventDefault();
    ajaxGet("mens", "vests", logResponse)
  })
  $("#mensPants").on("click", function (event) {
    event.preventDefault();
    ajaxGet("mens", "pants", logResponse)
  })
  //WOMENS//
  $("#womensJackets").on("click", function (event) {
    event.preventDefault();
    ajaxGet("womens", "jackets", logResponse)
  })
  $("#womensFleece").on("click", function (event) {
    event.preventDefault();
    ajaxGet("womens", "fleece", logResponse)
  })
  $("#womensVests").on("click", function (event) {
    event.preventDefault();
    ajaxGet("womens", "vests", logResponse)
  })
  $("#womensPants").on("click", function (event) {
    event.preventDefault();
    ajaxGet("womens", "pants", logResponse)
  })
  //EQUIPMENT - SKI//
  $("#skis").on("click", function (event) {
    event.preventDefault();
    ajaxGet("ski", "skis", logResponse)
  })
  $("#skiBindings").on("click", function (event) {
    event.preventDefault();
    ajaxGet("ski", "bindings", logResponse)
  })
  $("#skiBoots").on("click", function (event) {
    event.preventDefault();
    ajaxGet("ski", "boots", logResponse)
  })
  $("#skis").on("click", function (event) {
    event.preventDefault();
    ajaxGet("ski", "skis", logResponse)
  })
  //EQUIPMENT - SNOW//
  $("#snowboards").on("click", function (event) {
    event.preventDefault();
    ajaxGet("snowboard", "boards", logResponse)
  })
  $("#snowBindings").on("click", function (event) {
    event.preventDefault();
    ajaxGet("snowboard", "bindings", logResponse)
  })
  $("#snowBoots").on("click", function (event) {
    event.preventDefault();
    ajaxGet("snowboard", "boots", logResponse)
  })
  //SAFETY - HELMETS//
  $(".helmets").on("click", function (event) {
    event.preventDefault();
    ajaxGet("equipment", "helmets", logResponse)
  })
  
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
