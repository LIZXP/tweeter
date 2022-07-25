/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

const createTweetElement = function (indx) {
  const tweetElements = `
  <article>
    <header class="tweetheader">
      <div>
        <img id="image" src="./images/chat1.png" alt="chaticon" />
        <label>${indx.user.name}</label>
      </div>
      <p><b>${indx.user.handle}</b></p>
    </header>
    <main>
      <p class="posttext">
      ${escapex(indx.content.text)}
      </p>
    </main>
    <footer>
      <div class="foot-content">
        <p>Posted ${timeago.format(indx.created_at)}</p>
        <div id="foot-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-repeat"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </div>
    </footer>
  </article>`;
  return tweetElements;
};

// This function is responsible for taking in an array of tweet objects and then appending each one to the #tweets-container.

const renderTweets = function (data) {
  for (let indx of data) {
    const newTweetEles = createTweetElement(indx);
    $(".posted-tweets").prepend(newTweetEles);
  }
};

// add an event listener that listens for the submit event
// prevent the default behaviour of the submit event (data submission and page refresh)
// create an AJAX POST request in client.js that sends the form data to the server.
//invoke the loadtweets function when document ready

$(document).ready(function () {
  $(".new-tweet form").submit(function (event) {
    event.preventDefault();
    let text = $(".new-tweet textarea").val();
    let textLength = text.length;
    if (textLength === 0) {
      $("#notext").slideDown();
      setTimeout(() => {
        $("#notext").slideUp();
      }, 2500);
    }
    if (textLength > 140) {
      $("#toomany").slideDown();
      setTimeout(() => {
        $("#toomany").slideUp();
      }, 2500);
    } else if (textLength <= 140 && textLength > 0) {
      $.post("/tweets/", $(".new-tweet form").serialize()).then(() => {
        $(".posted-tweets").empty();
        loadtweets();
        $("form").trigger("reset");
      });
    }
  });
  loadtweets();
});

//feching the data with ajax get request
//passing the renderTweets function into success callback

const loadtweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets/",
    dataType: "json",
    success: (data) => {
      $(".new_tweet").empty();
      renderTweets(data);
    },
    error: (error) => {
      console.log(error);
    },
  });
};

//Preventing XSS with Escaping
//create new element Div
//create the user input as string and appendChild to the div
//return the text to show it on the string literal.

const escapex = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
