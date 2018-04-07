
'use strict';

// initial variable declarations and assignments

let NYapiKey = "7d7d81b70c5a4f28b5e538f6012ea8ea";
let movieReviewNYapiURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=transformers&api-key=" + NYapiKey + "&q=";
let articleSearchapiURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYapiKey + "&q=";



let movieTitle;
let apiKey = "4b988a5c";
let ajaxOmdbUrl;
let clickCounter = 0;


// when a movie title is typed into the #item text box and the #add / Find Your Movie button is clicked
// the function below executes. 

$(document).on("click", "#add", function (event) {
    event.preventDefault();


    // clear any span tags from previous searches if a user has searched for a movie before in the current browser session    
    if (clickCounter > 0) {
        $("span").remove(".movie-info");
    };

    clickCounter++;

    // variable declaration and assignments
    movieTitle = $("#item").val().trim();

    console.log("movietitle ", movieTitle);
    //input validation
    if (movieTitle === "") {
        $("#errormsg").text("Input box blank");
    } else {

        // Ajax call to the NYT and function that performs the DOM manipulation
        $.ajax({
            url: movieReviewNYapiURL,
            method: "GET"
        }).then(function (result) {
            console.log(result);
            $('#review-link').attr('href', result.results[0].link.url);

            console.log("link ", result.results[0].link.url);


        })


        let ajaxOmdbUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&apikey=" + apiKey;

        // Ajax call to the OMDB and function that performs the DOM manipulation
        $.ajax({
            url: ajaxOmdbUrl,
            method: "GET",
        }).then(function (response) {
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
            console.log("response.Poster ", response.Poster);
            console.log("imgURL ", imgURL);
            // Creating an element to hold the image
            let image = $("<img>").attr("src", imgURL);
            // Appending the image
            $("#movie-poster").append(image);

        });


        // clear the text box that contains the movie title
        $("#item").val("");
    }
});
