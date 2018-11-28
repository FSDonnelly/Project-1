// Zomato API Key
// 607ac1df1cd9f4b953daa677c26fa7b5
// Nutrition API 
// Nutrition Application ID
var app_id = "2832791b"
// Nutrition Application Keys
var app_key = "6cbae518bc27c53aaf8617d2fa3b02a8";
// var url = `https://api.edamam.com/api/food-database/parser?ingr=${search}&app_id=${app_id}&app_key=${app_key}`;
// $.ajax({
//    url: url,
//    method:  "GET"
// })
// .done(function(res) {
//    console.log(res)
// })
// Recepie API 
// Recepie Application ID 
var recipieId =  "9dde05df";
// Recepie Key
var recipieKey = "53d3f933242cd18123fd5222bea8319d";
var recipies;
var food = [];
  // Function for displaying food data
  function searchImage() {
    // Deleting the food buttons prior to adding new food buttons
    // (this is necessary otherwise we will have repeat buttons)
    $(".row").empty();
    // Looping through the array of foods
    for (var i = 0; i < food.length; i++) {
      // Then dynamicaly generating buttons for each food in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      // <div class="card" style="width: 18rem;">
      
      //               <img class="card-img-top" id = "search"  >
      //               <div class="card-body">
      //                   
      //                   <p class="card-text">Some quick example text to build on the card title and make up the bulk of
      //                       the card's content.</p>
      //                   
    var cardDiv = $("<div class= 'card' >");
    cardDiv.attr("style","width: 18rem;" );
    // var newCol = $("<div class= 'col-md-2' >");
    var imageUrl = food[i].recipe.image;
    console.log(imageUrl);
   ;
    var image =$("<img>").attr( 'src', imageUrl);
    image.addClass("card-img-top");
    image.attr("style", "width:18rem; height:180px;" );
    
    // console.log(image);
    cardDiv.append(image);
    //  newCol.append(cardDiv)
    // append label of food to image
    // <h5 class="card-title">Card title</h5>
    var label = food[i].recipe.label;
    var cardTitle = $("<h5>").text(label);
    image.addClass("card-title");
    
    cardDiv.append(cardTitle);

    // <a href="#" class="btn btn-primary">Go somewhere</a>
    // append ingredients to image
    // var ingredients = food[i].recipe.ingredientLines;
    
    var cardButton = $("<ol>").text("ingredients")
    cardButton.addClass("btn btn-primary");
    cardDiv.append(cardButton);
    // append nutrtion to image
    var cardButton = $("<ol>").text("nutrition")
    cardButton.addClass("btn btn-primary");
    cardDiv.append(cardButton);
    $("#food-view").prepend(cardDiv);
    
    }
    
  }
  // This function handles events where one button is clicked
//   var search = "";
  $("#search-input").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
   
    // search = "";
    // This line will grab the text from the input box
    var foods = $("#user-input").val().trim();
    // The food from the textbox is then added to our array
    console.log(foods);
    // calling searchImage which handles the processing of our food array
    var recipieUrl = `https://api.edamam.com/search?q=${foods}&app_id=${recipieId}&app_key=${recipieKey}`;

$.ajax({
    url: recipieUrl,
    method:  "GET"
  })
  .then(function(res) {
    console.log(res);
    var i;
    // recipies = res.hits[i];
    // var image =r
    // console.log(food)
    // food.push(image);
    food = food.concat(res.hits);
    console.log(food)
    console.log(food[0].recipe.image);
    
   
    searchImage();
  })
  
    
  });
  // Calling the searchImage function at least once to display the initial list of foods
  // searchImage();