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
      ${indx.content.text}
      </p>
    </main>
    <footer>
      <div class="foot-content">
        <p>${indx.created_at}</p>
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
    $(".posted-tweets").append(newTweetEles);
  }
};

// add an event listener that listens for the submit event
// prevent the default behaviour of the submit event (data submission and page refresh)
// create an AJAX POST request in client.js that sends the form data to the server.
//invoke the loadtweets function when document ready

$(document).ready(function () {
  $(".new-tweet form").submit(function (event) {
    event.preventDefault();
    let dataString = $(this).serialize();
    $.ajax({ type: "POST", url: "/tweets/", data: dataString });
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
      renderTweets(data);
    },
    error: (error) => {
      console.log(error);
    },
  });
};
