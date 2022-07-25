//find the input length useing val() on $(this) as refer the #tweet-text
//traverse up the DOM tree from that node/element and then back down to a node that matches the '.counter'
//use .css() when the condition matches the counter.val()
$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let inputlength = $(this).val().length;
    let maxChar = 140;
    let charLeft = maxChar - inputlength;
    const counter = $(this).parent().children("div").children(".counter");
    counter.val(charLeft);
    if (counter.val() >= 0) {
      counter.css("color", "#545149");
    } else {
      counter.css("color", "red");
    }
  });
});
