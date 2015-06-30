// Problem: Prevent spoilerphobes from seeing spoilers
//Soluction: Hide spoilers and reveal them through user interaction

//1. Hide spoilers.
//2. Add a button to show spoilers




$(".spoiler span").hide();

$(".spoiler").after("<button>Show Spoilers!</button>");

$("button").click(function() {
    var name = $(this).prev().children().css("display");
    console.log(name);
    if(name === "none") {
        $(this).prev().children().toggle();
        $(this).html("Hide Spoilers!")
    } else {
        if(name === "inline-block") {
            $(this).prev().children().toggle();
            $(this).html("Show Spoilers!")
        }
    }
});













































////1. Hide spoiler
//$(".spoiler span").hide();
////2. Add a button
//$(".spoiler").append("<button>Reveal Spoiler!</button>")
////3. When button is pressed
//$("button").click(function() {
//  //3.1 Show spoiler next to the button clicked
//  $(this).prev().show();
////  $(".spoiler span").show();
//  //3.2 Get rid of button
//  $(this).remove();
//});
