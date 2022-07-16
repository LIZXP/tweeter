/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//hard code data for testing
const data = [
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
];

// function createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

const createTweetElement = function (indx) {
  const tweetElements = `
  <article>
    <header class="tweetheader">
      <div>
        <img id="image" src="./images/chat1.png" alt="chaticon" />
        <label>${indx.user.name}</label>
      </div>
      <h4>${indx.user.handle}</h4>
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
$(document).ready(function () {
  renderTweets(data);
});
