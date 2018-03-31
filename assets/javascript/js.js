'use strict';

let NYapiKey = "7d7d81b70c5a4f28b5e538f6012ea8ea"; 
let movieReviewNYapiURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=" + NYapiKey + "&q=";
let articleSearchapiURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYapiKey + "&q=";
$.ajax({
    url: articleSearchapiURL,
    method: "GET"
    }).done(function(result){
    console.log(result);
    })
$.ajax({
    url: movieReviewNYapiURL,
    method: "GET"
    }).done(function(result){
    console.log(result);
    })
    document.addEventListener('keypress', function (e){
        
    })