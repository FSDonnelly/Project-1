$(document).ready(function () {
  var array = JSON.parse(localStorage.getItem("searchItems"));
  console.log(array);
  console.log("First item:" + array[0], "Second item:" + array[1], "Third item:" + array[2]);

  // frank's edamam api key
  var apiKey = "53d3f933242cd18123fd5222bea8319d";
  var apiId = "9dde05df";

  // ahmed & frank declaring variables
  var searchTerm = "";
  var numIngredients = 0;
  var numResults = 0;
  var numTime = 0;
  var chosenSearch = [];

  // Initialize Firebase
  // kat's db for bon appéEAT
  var config = {
    apiKey: "AIzaSyDOLRm4v_oHJFDZGJI-hNPcnfNtgotIoco",
    authDomain: "bon-appe-eat.firebaseapp.com",
    databaseURL: "https://bon-appe-eat.firebaseio.com",
    projectId: "bon-appe-eat",
    storageBucket: "bon-appe-eat.appspot.com",
    messagingSenderId: "823547780988"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // edamam url base
  var queryURLBase =
    "http://api.edamam.com/search?from=0&to=20&app_id=" +
    apiId +
    "&app_key=" +
    apiKey;

  // track the number of recipes
  recipeCounter = 0;
  searchTerm = array[0];
  numTime = parseInt(array[1]);
  numResults = array[2];
  var newURL = queryURLBase + "&q=" + searchTerm;
  runQuery(parseInt(numResults), newURL);

  function runQuery(numSearch, queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      $("#displayResults").empty();

      if (parseInt(numTime) === 30) {
        response.hits.forEach(function (element) {
          if (
            element.recipe.totalTime < numTime &&
            element.recipe.totalTime != 0
          ) {
            chosenSearch.push(element.recipe);
          }
        });
      }

      if (parseInt(numTime) === 60) {
        response.hits.forEach(function (element) {
          if (
            element.recipe.totalTime < numTime &&
            element.recipe.totalTime > 30 &&
            element.recipe.totalTime != 0
          ) {
            chosenSearch.push(element.recipe);
          }
        });
      }

      if (parseInt(numTime) === 120) {
        response.hits.forEach(function (element) {
          if (
            element.recipe.totalTime < numTime &&
            element.recipe.totalTime > 60 &&
            element.recipe.totalTime != 0
          ) {
            chosenSearch.push(element.recipe);
          }
        });
      }

      chosenSearch.slice(0, numSearch).forEach(function (element, i) {
        var calories = Math.round(element.calories / element.yield);

        var displaySection = $("<div>");
        displaySection.attr("id", "recipe-" + i);
        displaySection.addClass("card p-3 m-2 verticalList");

        var displayVideo = $("<div>");
        displayVideo.attr("id", "player-" + i);
        displayVideo.addClass("m-2");

        var displayVideo1 = $("<div>");
        displayVideo1.attr("id", "player1-" + i);
        displayVideo1.addClass("m-2");

        var displayVideo2 = $("<div>");
        displayVideo2.attr("id", "player2-" + i);
        displayVideo2.addClass("m-2");

        var videoSection = $("<div>");
        videoSection.attr("id", "videoSection-" + i);
        videoSection.append(displayVideo);
        videoSection.append(displayVideo1);
        videoSection.append(displayVideo2);

        // instruction button
        var instructionBtn = $("<button>");
        instructionBtn.attr("src", element.url);
        instructionBtn.text("See Instructions");
        instructionBtn.addClass("instructionBtn w-25 m-3");

        // youtube video button
        var youtubeBtn = $("<button>");
        youtubeBtn.attr("name", element.label);
        youtubeBtn.attr("index", i);
        youtubeBtn.text("Show Sample Videos");
        youtubeBtn.addClass("videoBtn w-25 m-3");

        // save to collection aka My Favorites Button
        var saveBtn = $("<button>");
        saveBtn.attr("data-title", element.label);
        saveBtn.attr("data-image", element.image);
        saveBtn.attr("data-calories", calories);
        saveBtn.attr("data-ingredientLines", element.ingredientLines);
        saveBtn.attr("data-dietLabel", element.dietLabels);
        saveBtn.attr("data-healthLabel", element.healthLabels);
        saveBtn.attr("data-url", element.url);
        saveBtn.text("Save to My Favorites");
        // saveBtn.text("Save to Collections");
        saveBtn.addClass("saveBtn w-25 m-3");

        // buttons container for the above three buttons
        var buttonSection = $("<div>");
        buttonSection.attr("id", "buttonSection-" + i);
        buttonSection.append(instructionBtn);
        buttonSection.append(youtubeBtn);
        buttonSection.append(saveBtn);

        $("#displayResults").append(displaySection)

        // attach the content to the appropriate div
        $("#recipe-" + i).append("<h3>" + element.label.toUpperCase() + "</h3>");
        $("#recipe-" + i).append(
          "<h5>" +
          element.healthLabels.join(" ") +
          " [ <i>" +
          element.dietLabels.join(" ") +
          " </i>]" +
          "</h5>"
        );
        $("#recipe-" + i).append(
          "<p>" + element.ingredientLines.join("\n") + "</p>"
        );
        $("#recipe-" + i).append(
          "<img class= 'rounded float-left w-25 h-50' src='" +
          element.image +
          "'></img>"
        );
        $("#recipe-" + i).append(
          "<h5> Total Calories/person: " + calories + "</h5>"
        );
        $("#recipe-" + i).append(buttonSection);
        $("#recipe-" + i).append(videoSection);
      });
    });
  }

  $(document).on("click", ".instructionBtn", function () {
    var url = $(this).attr("src");
    window.open(url);
  });

  $(document).on("click", ".saveBtn", function () {
    var title = $(this).attr("data-title");
    var image = $(this).attr("data-image");
    var calories = $(this).attr("data-calories");
    var dietLabel = $(this).attr("data-dietLabel");
    var healthLabel = $(this).attr("data-healthLabel");
    var url = $(this).attr("data-url");

    database.ref().push({
      title: title,
      image: image,
      calories: calories,
      dietLabel: dietLabel,
      healthLabel: healthLabel,
      url: url,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  // iris' youtube api key & section
  var videoIdArray = [];
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  $(document).on("click", ".videoBtn", function () {
    videoIdArray = [];
    var name = $(this).attr("name");
    var index = $(this).attr("index");
    var queryURL =
      "https://www.googleapis.com/youtube/v3/search?q=" +
      name + "&order=relevance" + "&maxResults=3" +
      "&part=snippet&key=AIzaSyDRoM4iF7sZ807Iv__tG3KzEa2hRNBXHbM";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .done(function (result) {
        result.items.forEach(function (element) {
          videoIdArray.push(element.id.videoId);
        });

        console.log(videoIdArray);

        function onYouTubeIframeAPIReady() {
          player = new YT.Player("player-" + index, {
            height: "150",
            width: "300",
            videoId: videoIdArray[0],
            events: {
              onReady: onPlayerReady
            }
          });
        }

        function onYouTubeIframeAPIReady1() {
          player1 = new YT.Player("player1-" + index, {
            height: "150",
            width: "300",
            videoId: videoIdArray[1],
            events: {
              onReady: onPlayerReady
            }
          });
        }

        function onYouTubeIframeAPIReady2() {
          player2 = new YT.Player("player2-" + index, {
            height: "150",
            width: "300",
            videoId: videoIdArray[2],
            events: {
              onReady: onPlayerReady
            }
          });
        }

        // the api will call this function when the video player is ready
        var done = false;
        function onPlayerReady(event) {
          if (done) {
            event.target.playVideo();
            done = true;
          }
        }

        onYouTubeIframeAPIReady();
        onYouTubeIframeAPIReady1();
        onYouTubeIframeAPIReady2();
        // onYouTubeIframeAPIReady3()
      })
      .fail(function (err) {
        throw err;
      });
  });

});
