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
  console.log("content", content);


  if (typeof content.title !== "undefined") {
    var newCol = $("<div>").addClass("col-md-4");

    var newCard = $("<div>").addClass("card border-1 f-card mr-3 mb-3");
    newCard.attr("style", "width: 100%; height: 95%");
    var newImg = $("<img>").addClass("card-img-top");
    newImg.attr("src", content.image);
    var newCardBody = $("<div>").addClass("card-body");
    newCardBody.html("<h5>" + content.title + "</h5>" +
      "<p>" + content.healthLabel.replace(/,/g, " ") + "[<i>" + content.dietLabel + "</i>]</p>" +
      "<p>Total Calories: " + content.calories + "/person</p>" +
      "<a href ='" + content.url + "' target='_blank'>" + content.url + "</a>");

    newCard.append(newImg, newCardBody);
    newCol.append(newCard);
    $("#collection-list").prepend(newCol);
  };

});
