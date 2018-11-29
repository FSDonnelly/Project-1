// Zomato API Key
// 607ac1df1cd9f4b953daa677c26fa7b5
// Nutrition API 
// Nutrition Application ID
var app_id = "2832791b"
// Nutrition Application Keys
var app_key = "6cbae518bc27c53aaf8617d2fa3b02a8";

// Recepie API 
// Recepie Application ID 
var recipieId = "9dde05df";
// Recepie Key
var recipieKey = "53d3f933242cd18123fd5222bea8319d";
var recipies;
var food = [];
// Function for displaying food data
function searchImage() {
  // Deleting the food buttons prior to adding new food buttons
  // (this is necessary otherwise we will have repeat buttons)

  // $(cardDiv).empty();
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
    var cardDiv = $("<div class= 'card'>");
    cardDiv.attr("style", "width: 18rem;");

    // var newCol = $("<div class= 'col-md-2' >");
    var imageUrl = food[i].recipe.image;
    console.log(imageUrl);
    ;
    var image = $("<img>").attr('src', imageUrl);
    image.addClass("card-img-top");
    image.attr("style", "width:18rem; height:180px;");

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

    var cardButton = $("<ol id = 'more-info-btn'>").text("more info")
    cardButton.addClass("btn btn-primary");
    $("<button>").attr("#ingredients-btn");
    // cardButton.attr("id = 'nutrition-btn'");
    cardDiv.append(cardButton);
    $("#food-view").prepend(cardDiv);

  }

}
// This function handles events where one button is clicked
$("#search-input").on("click", function (event) {
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
    method: "GET"
  })
    .then(function (res) {
      console.log(res);
      var i;
      // recipies = res.hits[i];
      // var image =r
      // console.log(food)
      // food.push(image);
      food = res.hits;
      console.log('hello');
      console.log(res.hits)
      console.log(food[0].recipe.image);


      searchImage();
    })
  $("#food-view").empty();
  // $(document).on("click", "#ingredients-btn", ingredients);
  // var ingredients = food[i].recipe.ingredientLines;
  // console.log(ingredients);
});
// Calling the searchImage function at least once to display the initial list of foods
// searchImage();



$(document).ready(function () {

  var config = {
    apiKey: "AIzaSyBE9Jfmii8lrBmgl-t4hJjxcNRX6PWB3kw",
    authDomain: "project-1-2ebfb.firebaseapp.com",
    databaseURL: "https://project-1-2ebfb.firebaseio.com",
    projectId: "project-1-2ebfb",
    storageBucket: "project-1-2ebfb.appspot.com",
    messagingSenderId: "454772781767"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // Capture Button Click
  $("#addRecipe").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text boxes
    var recipeName = $("#recipe-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var image = $("#image").val().trim();

    // Code for handling the push
    database.ref().push({
      recipeName: recipeName,
      destination: destination,
      firstTrain: firstTrain,
      image: image,
    });


    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function (childSnapshot) {

      var newRecipeName  = childSnapshot.val().recipeName;
      var newIngredients = childSnapshot.val().ingredients;
      var newInstructions = childSnapshot.val().instructions;
      var newimage = childSnapshot.val().image;


      // Display On Page
      $("#all-display").append(
        ' <tr><td>' + newRecipeName +
        ' </td><td>' + newIngredients +
        ' </td><td>' + newInstructions +
        ' </td><td>' + newimage + '</td></tr>');

      // Clear input fields
      $("#recipe-name, #ingredients, #instructions, #image").val("");
      return false;
    },
      //Handle the errors
      function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

    })})