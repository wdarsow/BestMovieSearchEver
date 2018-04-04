'use strict';

$("#add").on("click", function (event) {
    event.preventDefault();
    let movieTitle = $("#item").val();

    $("#item").val("");
});