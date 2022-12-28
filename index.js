var buttonColors = ["blue", "red", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var flag = false;
var level = 0;

$(document).keydown(function() {
  if (flag === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    flag = true;
  }
});


$(".btn").click(function() {
  var key = ($(this).attr('id'));
  userClickedPattern.push(key);
  isPressed(key);
  sound(key);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNum = (Math.floor(Math.random() * 3)) + 1;
  var randomColor = buttonColors[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  sound(randomColor);
}

function sound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function isPressed(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function() {
    $("#" + key).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    sound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  flag = false;
  gamePattern = [];
}
