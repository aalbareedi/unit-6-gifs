$(document).ready(function() {
  var topics = ["cat", "dog", "bird", "turtle", "mouse"];
  createElements();
  // turns our list of animals into visual buttons
  function createElements() {
    for (var i = 0; i < topics.length; i++) {
      var button = $("<button>");
      button.text(topics[i]);
      button.addClass("topic");
      $("#section1").append(button);
    }
  }
  // when you click on the submit button, takes the input and 1.) adds it with our buttons, 2.) retrieve its gif data from the api
  $("#searchButton").on("click", function() {
    var inputElement = $("input").val();
    addElement(inputElement);
    makeGetRequest(inputElement);
    $("input").val(""); //clears out the current text in the input
  });
  // when you click on an animal button
  $(".topic").on("click", function() {
    var topic = $(this).text();
    makeGetRequest(topic);
  });
  // turns our element into a button and adds it to the html
  function addElement(element) {
    topics.push(element);
    var button = $("<button>");
    button.text(element);
    button.addClass("topic");
    $("#section1").append(button);
  }
  // accesses the api for the selected topic(animal), retrieving the appropriate data and adding it to the html
  function makeGetRequest(searchValue) {
    $("#gifs-appear-here").html(""); // clear the gifs displayed before loading new ones
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchValue +
      "&api_key=aunOM3xqXgBYe6oYpRewk7ySbDmAxOF1&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var image = $("<img>");
          image.attr("src", results[i].images.fixed_height.url);
          image.attr("data-still", results[i].images.fixed_height_still.url);
          image.attr("data-animate", results[i].images.fixed_height.url);
          image.attr("data-state", "animate");
          image.addClass("gif");
          gifDiv.append(p);
          gifDiv.append(image);
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
  }
  // used to pause the gifs
  $(".gif").click(function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});
