var indexNum = localStorage.getItem("indexNum");
var foodName = localStorage.getItem("food");

// object
var savedFood = JSON.parse(foodName);
console.log(savedFood);

// contents wrapper
var edamamInfo = $("<div class='col-md-12'>");

// img of recipe
var recipeImg = $("<img>");
recipeImg.attr("src", savedFood.recipe.image);

// name of the recipe
var recipeLabel = $("<p>");
recipeLabel.text(savedFood.recipe.label);

// carolies
var recipeCals = $("<p>");
recipeCals.text("Calories: " + savedFood.recipe.calories);

// allergies
var recipeAllergies = $("<p>");
recipeAllergies.text("Allergies: " + savedFood.recipe.cautions);

// diet labels
var recipeDL = $("<p>");
recipeDL.text("Diet Info: " + savedFood.recipe.dietLabels);

// health labels 1
var recipeHealth = $("<p>");
recipeHealth.text("Health Info: " + savedFood.recipe.healthLabels);

// .ingredientLines
var recipeIngOne = $("<p>");
recipeIngOne.text("Ingredients One: " + savedFood.recipe.ingredientLines);

// .ingredients
// var recipeIngTwo = $("<p>");
// recipeIngTwo.text("Ingredients Two: " + savedFood.recipe.ingredients);

// show dynamically on page under #edamam id in html
edamamInfo.append(recipeImg, recipeLabel, recipeCals, recipeAllergies, recipeDL, recipeHealth, recipeIngOne);

$("#edamam").append(edamamInfo);
