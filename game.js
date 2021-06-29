var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
	if(!started){
	$("#level-title").text("Level " + level);
	nextSequence();
	started = true;
}

});

$(".btn").click(function() {
  var useChosenColour = $(this).attr("id");
  userClickedPattern.push(useChosenColour);

  playSound(useChosenColour);
  animatePress(useChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

	userClickedPattern = [];

	level++;
	$("#level-title").text("Level " + level);
	
	var randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name)
{
    var audio = new Audio("C:/Users/D/Desktop/html/Html1_udemy/Simon Game Challenge Starting Files/sounds/" +name+ ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
   $("#" +currentColour).addClass("pressed");
   setTimeout(function(){
   	 $("#" +currentColour).removeClass("pressed");
            //....and whatever else you need to do
    }, 100);
   
}

function checkAnswer(currentLevel)
{
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
   {
   	 // console.log("success");

   	  if(userClickedPattern.length === gamePattern.length)
   	  {
   	  	setTimeout(function()
   	  	{
           nextSequence();
   	  	},1000);
   	  }
   	  
   }
   else{
   	  	//console.log("wrong");

   	  	playSound("C:/Users/D/Desktop/html/Html1_udemy/Simon Game Challenge Starting Files/sounds/wrong.mp3");
   	  	$("body").addClass("game-over");
   	  	setTimeout(function(){
   	  		$("body").removeClass("game-over");
   	  	},200);

   	  	$("#level-title").text("Game Over , Press any key to restart");

   	  	startOver();
   	  }
}

function startOver()
{
   level = 0;
   gamePattern = [];
   started = false;
}
