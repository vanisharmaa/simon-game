//7.1.1 You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var gameStarted = false;

// 7.2. Create a new variable called level and start at level 0.
var level = 0;

// 7.1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).on("keydown", function(){
  if(!gameStarted){
    gameStarted = true;
    nextSequence();

    // 7.3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
  }
});

//1.1 -> Add JS and jQuery to your file

// 4.3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//2.3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

// 2.5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];


// 2.1. Inside game.js create a new function called nextSequence()

function nextSequence(){
  // 7.4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  userClickedPattern = [];
  level++;

  // 2.2. Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  // You can use the Chrome console to verify that your code creates random numbers between the correct range.
  var randomNumber =  Math.floor(Math.random()*4);

  // 2.4. Create a new variable called randomChosenColour and use the randomNumber from step 2 to select a random colour from the buttonColours array.
  var randomChosenColour = buttonColours[randomNumber];

  // 2.6. Add the new randomChosenColour generated in step 4 to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // 3.1. Use jQuery to select the button with the same id as the randomChosenColour
  // 3.2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // 5.2.ii Create a new function called playSound() that takes a single input parameter called name.
  // 5.3.ii Take the code we used to play sound in the nextSequence() function and move it to playSound().
  // 5.4.ii Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);

  // 7.5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
}

// 3.3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
function playSound(currentColor){
  var audio = new Audio("sounds/sounds_" + currentColor + ".mp3");
  audio.play();

  // 5.2.i Create a new function called playSound() that takes a single input parameter called name.
  // 5.3.i Take the code we used to play sound in the nextSequence() function and move it to playSound().
  // 5.4.i Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
}


// 4.1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function(){

  // 4.2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  // --> So if the Green button was clicked, userChosenColour will equal its id which is "green".
  var userChosenColour = $(this).attr("id");

  // 4.4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);

  // 4.5. At this stage, if you log the userClickedPattern you should be able to build up an array in the console by clicking on different buttons.
  // 5.1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played. e.g if the Green button is clicked, then green.mp3 should be played.
  playSound(userChosenColour);

  // 6.2. Take a look inside the styles.css file, you can see there is a class called "pressed", it will add a box shadow and changes the background colour to grey.
  // 6.3. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  animatePress(userChosenColour);

  // 8.2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  // e.g. If the user has pressed red, green, red, yellow, the index of the last answer is 3.
  checkAnswer(userClickedPattern.length - 1);
});

// 6.1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  // 6.4. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100, currentColour);
}
/*
At this point, it might be worth reviewing how the Simon game works.

Firstly, the game shows the first colour in the sequence (blue). The user clicks on the blue button.

Next, the game shows the next colour (red), the user has to remember the sequence is blue, red and so on and so forth.

If the user messes up the sequence, then the game ends.
*/

// You can either try to figure out how to achieve this logic by trying to write the code yourself or you can follow the challenge steps below:

// 8.1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){

  // 8.3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  // You can now use these log statements along with logging the values of userClickedPattern and gamePattern in the Chrome Developer Tools console to check whether if your code is performing as you would expect and debug your code as needed. Once you're done, feel free to remove these log statements.
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    // console.log("success");

    // 8.4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if(userClickedPattern.length === gamePattern.length){

      // 8.5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(nextSequence, 1000);
    }
  }else{
    // console.log("wrong");

    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// 8.6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
function startOver(){
  gamePattern = [];
  level = 0;
  gameStarted = false;
}
