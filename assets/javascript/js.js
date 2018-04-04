'use strict';

// initial variable declarations and assignments
let movieTitle;
let apiKey = "4b988a5c";
let ajaxOmdbUrl;
let clickCounter = 0;

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

// adding this comment to push this new branch to the repo