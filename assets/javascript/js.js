'use strict';

let listItems;
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
    let item = $("#item").val();
    console.log("item ", item);
    listItems.push(item);
    localStorage.setItem("listItems", JSON.stringify(listItems));
    displayItems();
    // clear input
    $("#item").val("");
});

// run on page load and every time button is clicked
function displayItems() {
    $("#movielist").empty();
    let data = JSON.parse(localStorage.getItem("listItems"));
    for (let i = 0; i < data.length; i++) {
        let myDiv = $("<div>");
        let myButton = $("<button>");
        myButton.attr("data", i);
        myButton.append("✓");
        myButton.addClass("buttons");
        myDiv.append(myButton);
        myDiv.append(" " + data[i]);
        // myDiv.html("<button>x</button> " + data[i]);
        //  myDiv.attr("data", i);
        $("#movielist").append(myDiv);
    }
};


//remove item from the list
$(document).on("click", ".buttons", function () {
    let eachItem = $(this).attr("data");
    listItems.splice(eachItem, 1);
    localStorage.setItem("listItems", JSON.stringify(listItems));
    displayItems();

});