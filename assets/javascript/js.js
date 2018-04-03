'use strict';

let ajaxUrl = "http://www.omdbapi.com/" + "?i=tt3896198&" + "apikey=4b988a5c";

$("#add").on("click", function (event) {
    event.preventDefault();
    let movieTitle = $("#item").val();

    $("#item").val("");
});
