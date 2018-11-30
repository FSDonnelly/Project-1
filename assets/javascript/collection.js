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

// child-added event listener listenning to nodes 
database.ref().on("child_added", function (snapshot) {

  console.log(snapshot);
  console.log(snapshot.val());
  var content = snapshot.val();
  console.log(content.title);
  var newRow = $("<div>");
  newRow.addClass("border m-4 p-3");
  newRow.html("<h1>" + content.title + "</h1>" + "<img src='" + content.image + "' />" +
    "<p>" + content.healthLabel + "[<i>" + content.dietLabel + "</i>]</p>" + "<p>Total Calories: " + content.calories + "/person</p>"
    + "<a href ='" + content.url + "'>" + content.url + "</a>");

  $("#collection-list").prepend(newRow);
});
