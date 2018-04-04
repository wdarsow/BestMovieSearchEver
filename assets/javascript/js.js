'use strict';

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
}

$("#add").on("click", function (event) {
    event.preventDefault();
    let movieTitle = $("#item").val();
    listMovieTitle = movieTitle;


    $("#item").val("");
});


// display current list
localStorage.setItem("listItems", JSON.stringify(listItems));
displayItems();

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