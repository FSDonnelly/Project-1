
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
  function renderButtons() {
    // Deleting the food buttons prior to adding new food buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#food-view").empty();
    // Looping through the array of foods
    for (var i = 0; i < food.length; i++) {
      // Then dynamicaly generating buttons for each food in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var imageDiv = $("<div class= 'food' id = 'image'>");
      // Adding a class
      // imageDiv.addClass("food");
      // Adding a data-attribute with a value of the food at index i
      imageDiv.attr("data-name", food[i]);
      // Providing the button's text with a value of the food at index i
      imageDiv.html(food[i].recipe.image);
      // Adding the button to the HTML
      $("#food-view").append(imageDiv);
      // var imageDiv = $("<div id= 'food-view'>");
    var imageUrl = food[i].recipe.image;
    var image = $("<img>").attr("src", imageUrl, "class= 'image'")
    imageDiv.append(image);
    
    }
    
  }
  // This function handles events where one button is clicked
//   var search = "";
  $("#add-food").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();
    // search = "";
    // This line will grab the text from the input box
    var foods = $("#food-input").val().trim();
    // The food from the textbox is then added to our array
    
    // calling renderButtons which handles the processing of our food array
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
    
   

    renderButtons();
  })
  
    
  });
  // Calling the renderButtons function at least once to display the initial list of foods
  renderButtons();
  