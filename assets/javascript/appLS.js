$(document).ready(function () {
  // for upload recipe
  $('#summernote').summernote();

  // frank's edamam api key
  var apiKey = "53d3f933242cd18123fd5222bea8319d";
  var apiId = "9dde05df";

  // ahmed & frank declaring variables
  var searchTerm = "";
  // var numIngredients = 0;
  var numResults = 0;
  var numTime = 0;
  // var chosenSearch = [];
  
  // Save the input into the Local Storage
  var searchItems = [];
  $("#searchBtn").on("click", function () {
    searchTerm = $("#searchTerm")
      .val()
      .trim();

    searchItems.push(searchTerm);
    numTime = $("#numTime").val();
    searchItems.push(numTime);
    numResults = $("#numResults").val();
    searchItems.push(numResults);
    localStorage.setItem("searchItems", JSON.stringify(searchItems));
    
    return true;
  });
  
});
