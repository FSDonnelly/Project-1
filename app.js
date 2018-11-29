// Zomato Documentation: https://developers.zomato.com/documentation#/
// Zomato, Restaurant, /search
// Zomato API Key: 607ac1df1cd9f4b953daa677c26fa7b5
// https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=curry&count=10

var zomatoUrl =
  "https://developers.zomato.com/api/v2.1/search?entity_id=279&entity_type=city&q=thai+green+curry&count=10";

$.ajax({
  url: zomatoUrl,
  method: "GET",
  headers: {
    "user-key": "607ac1df1cd9f4b953daa677c26fa7b5"
  }
}).then(function (res) {
  console.log(res);
  var restaurants = res.restaurants;
  for (var i = 0; i < restaurants.length; i++) {

    // HANDLE NO IMAGE
    //  if(!restaurants[i].restaurant.thumb){
    //   restImg.attr("src", "rest_thumb.jpg");
    //  } else{
    //   restImg.attr("src", restaurants[i].restaurant.thumb);
    //  }

    // contents wrapper
    var restDiv = $("<div class='col-md-3' id='rest-item'>");

    // thumbnail
    var restImg = $("<img>");
    restImg.attr("src", restaurants[i].restaurant.thumb);

    // name of restaurant
    var restName = $("<p>");
    restName.text(restaurants[i].restaurant.name);

    // location of restaurant
    var restLocation = $("<p class='rest-location'>");
    restLocation.text(restaurants[i].restaurant.location.address);

    // show dynamically on page under #zomato
    restDiv.append(restImg, restName, restLocation);

    $("#zomato").append(restDiv);
  }
});
