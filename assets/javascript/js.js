'use strict';

// initial variable declarations and assignments
let movieTitle;
let apiKey = "4b988a5c";
let ajaxOmdbUrl;
let clickCounter = 0;
let listItems;
let listMovieTitle;


// check to see if something is in listItems
if (localStorage.getItem("listItems") === null) {
    listItems = [];
    console.log("listitems1 ", listItems);
} else {
    listItems = JSON.parse(localStorage.getItem("listItems"));
    console.log("listitems2 ", listItems);
    displayItems();
};

// display current list
localStorage.setItem("listItems", JSON.stringify(listItems));
displayItems();


// when a movie title is typed into the #item text box and the #add / Find Your Movie button is clicked
// the function below executes. 

$(document).on("click", "#add", function (event) {
    event.preventDefault();

    // clear any span tags from previous searches if a user has searched for a movie before in the current browser session    
    if(clickCounter > 0) {
        $("span").remove(".movie-info");
    };

    clickCounter++;
    
    // variable declaration and assignments
    movieTitle = $("#item").val().trim();
    listMovieTitle = movieTitle;
    let ajaxOmdbUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=" + apiKey;

    // Ajax call and function that performs the DOM manipulation
    $.ajax({
        url: ajaxOmdbUrl,
        method: "GET",
    }).then(function(response) {
        $("#actors").append(`<span class="movie-info">${response.Actors}</span>`);
        $("#director").append(`<span class="movie-info">${response.Director}</span>`);
        $("#genre").append(`<span class="movie-info">${response.Genre}</span>`);
        $("#lang").append(`<span class="movie-info">${response.Language}</span>`);
        $("#plot").append(`<span class="movie-info">${response.Plot}</span>`);
        $("#rating").append(`<span class="movie-info">${response.Ratings[0].Value}</span>`);
        $("#year").append(`<span class="movie-info">${response.Year}</span>`);
        $("#runTime").append(`<span class="movie-info">${response.Runtime}</span>`);
    });

// clear the text box that contains the movie title
$("#item").val("");

});



// add the movie to the list (when button is pressed)
$(".listbtn").on("click", function (event) {
    event.preventDefault();
    console.log("List button clicked");
    listItems.push(listMovieTitle);
    localStorage.setItem("listItems", JSON.stringify(listItems));
    displayItems();
});

// run on page load and every time button is clicked
function displayItems() {
    $("#movielist").empty();
    let data = JSON.parse(localStorage.getItem("listItems"));
    console.log("data ", data);
    for (let i = 0; i < data.length; i++) {
        let myDiv = $("<div>");
        let myButton = $("<button>");
        myButton.attr("data", i);
        myButton.append("✓");
        myButton.addClass("check");
        myDiv.append(myButton);
        myDiv.append(" " + data[i]);
        $("#movielist").append(myDiv);
        console.log("list output ", data[i]);
    }
};


//remove item from the list
$(document).on("click", ".check", function () {
    let eachItem = $(this).attr("data");
    listItems.splice(eachItem, 1);
    localStorage.setItem("listItems", JSON.stringify(listItems));
    displayItems();
});