var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("LEVEL "+level);
  var a=Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[a];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomChosenColor);
}

$(".btn").click(function(){
  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function playsound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");}, 100);
}
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
  nextSequence();
  started = true;

}
});

function checkAnswer(currentLevel){
  console.log("success");
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    }, 1000);
  }
}else{
  console.log("weong");
  playsound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startover();
}

}
function startover(){
   gamePattern = [];
   started = false;
   level = 0;

}
