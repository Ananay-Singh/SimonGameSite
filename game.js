
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;

// When a Key is pressed at the start of the game
$(document).keypress(function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});
// When user Clicks a button
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  console.log(userChosenColor);
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
})
// function to check the answers by the user
function checkAnswer(currentLevel) {
  console.log(userClickedPattern);
  console.log(gamePattern);

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over")
      setTimeout(function(){
        $("body").removeClass("game-over")
      }, 200)
      $('#level-title').text("Game over, Press any key to Restart");
      startOver();
    }
  }

// Function to generate a random number so a random color can be selected
function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text("Level " + level)


  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


  playSound(randomChosenColor);

  // Adding Animation

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}
// Function for animation when button is clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 80);
}

// Function Playing audio file
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



// function to start over
function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
