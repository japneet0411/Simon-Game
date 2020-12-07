gamePattern = [];
userClickedButton = [];
var level = 1;

buttonColors = ["red", "blue", "green", "yellow"];
$(document).keypress(function() {
  nextSequence();


});


function nextSequence() {
  $("h1").html("Level " + level);
  level++;
  var randomNumber = Math.floor((Math.random() * 4));
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  var select = "#" + randomChosenColor;
  $(select).fadeOut(100).fadeIn(100);
  playMusic(randomChosenColor);
}

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedButton.push(userChosenColor);
  playMusic(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedButton.length - 1);
});

function playMusic(color) {
  var music = "sounds/" + color + ".mp3"
  var audio = new Audio(music);
  audio.autoplay = true;
  audio.play();
}

function animatePress(currentColor) {
  var buttonid = "#" + currentColor;
  $(buttonid).addClass("pressed");

  setTimeout(function() {
    $(buttonid).removeClass("pressed");
  }, 100);
}

function checkAnswer(index) {
  if (gamePattern[index] == userClickedButton[index]) {


    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedButton)) {
      console.log("success");
      console.log(gamePattern);
      console.log(userClickedButton);
      userClickedButton = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  }
  else {
    console.log("FAIL");
    var wrongans = "wrong";
    playMusic(wrongans);
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");
    startover();
  }
}

function startover() {
  userClickedButton = [];
  gamePattern = [];
  level = 1;
}
