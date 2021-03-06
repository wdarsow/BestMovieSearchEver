'use strict';

// initial variable declarations and assignments
let NYapiKey = "7d7d81b70c5a4f28b5e538f6012ea8ea";
let movieTitle;
let apiKey = "4b988a5c";
let ajaxOmdbUrl;
let clickCounter = 0;

// when a movie title is typed into the #item text box and the #add / Find Your Movie button is clicked the function below executes
$(document).on("click", "#add", function (event) {
    event.preventDefault();
    // clear any span tags from previous searches if a user has searched for a movie before in the current browser session    
    if (clickCounter > 0) {
        $("span").remove(".movie-info");
    };
    
    // clear any previously stored error message text
    $("#errormsg").text("")

    // increment the clickCounter variable by 1 
    clickCounter++;

    // clear the previous movie poster from the DOM
    $("#movie-poster").empty();
    
    // set the movieTitle variable equal to the movie title that the user types in to the text box
    movieTitle = $("#item").val().trim();

    //input validation
    if (movieTitle === ""){
        $("#errormsg").text("Input box blank");
    } else {
        let movieReviewNYapiURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query="+ movieTitle + "&api-key=" + NYapiKey + "&q=";
    
    // Ajax call to the NYT and function that performs the DOM manipulation
    $.ajax({
        url: movieReviewNYapiURL,
        method: "GET"
    }).then(function(result) {
        for (let i=0; i<result.num_results; i++) {
            if (movieTitle === result.results[i].display_title) {
                $('#review-link').attr('href', result.results[i].link.url);
                };
            };

        // catch statement for capturing errors and alerting the user
        }).catch(function(err){
            $("#errormsg").text(`Error: ${err.abort.name}. Please try again.`);
    });

    // Ajax call to the OMDB, OMDB variable declaration & assignment, and function that performs the DOM manipulation
    let ajaxOmdbUrl = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=" + apiKey;

    $.ajax({
        url: ajaxOmdbUrl,
        method: "GET",
    }).then(function(response) {
        $("#title").append(`<span class="movie-info">${response.Title}</span>`);
        $("#actors").append(`<span class="movie-info">${response.Actors}</span>`);
        $("#director").append(`<span class="movie-info">${response.Director}</span>`);
        $("#genre").append(`<span class="movie-info">${response.Genre}</span>`);
        $("#lang").append(`<span class="movie-info">${response.Language}</span>`);
        $("#plot").append(`<span class="movie-info">${response.Plot}</span>`);
        $("#rating").append(`<span class="movie-info">${response.Ratings[0].Value}</span>`);
        $("#year").append(`<span class="movie-info">${response.Year}</span>`);
        $("#runTime").append(`<span class="movie-info">${response.Runtime}</span>`);
        
        // Retrieving the URL for the image
        let imgURL = response.Poster;
        
        // Creating an element to hold the image
        let image = $("<img>").attr("src", imgURL);
        
        // Appending the image
        if (imgURL !== "N/A") {
            $("#movie-poster").append(image);
        };

        // catch statement for capturing errors and alerting the user
        }).catch(function(error){
            $("#errormsg").text(`Error: ${error.responseJSON.Error} Please try again.`);
        });

        // clear the text box that contains the movie title
        $("#item").val("");
    };
});

