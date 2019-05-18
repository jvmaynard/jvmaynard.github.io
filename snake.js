// WELCOME TO MY SNAKE

// create snake
var draw = function(snakeToDraw, apple){
  var drawableSnake = { color: "green", pixels: snake }
  // curly brackets denote a JS object aka 'hash map', key:value pairs
  var drawableApple = { color: "pink", pixels: [apple] }
  var drawableObjects = [drawableSnake, drawableApple]
 // this var holds array which points to drawableSnake
  CHUNK.draw(drawableObjects)
 // CHUNK is an external library - takes info as array with objects
}

// move snake in different directions - conditional decision tree so that snake changes direction
var moveSegment = function(segment) {
  switch(segment.direction) {
    case "down":
      return { top: segment.top + 1, left: segment.left };
    case "up":
      return { top: segment.top - 1, left: segment.left };
    case "right":
      return { top: segment.top, left: segment.left + 1 }
    case "left":
      return { top: segment.top, left: segment.left - 1 }
    default:
      return segment;
  }
}

// makes tail follow the head - we wan to define this before moveSnake
var segmentFurtherForwardThan = function(index, snake) {
//  return snake[index - 1] -> this breaks if we look at a segment at 0! we need to try something else.
  if (snake[index - 1] === undefined) { //what happens when var is undef?
      return snake[index]; // then return the 0th element
    } else {
      return snake[index - 1]; // otherwise use the code before which broke
    }
// so we use if else statements
}

/* move snake with FOR
var moveSnake = function(snake) {
var newSnake = [];
snake.forEach(function(oldSegment) {
    //forEach is a loop type in JS where function will recur until we stop it
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = oldSegment.direction;
    newSnake.push(newSegment);
    push adds segment to our snake array
  })
return newSnake;
*/

var moveSnake = function(snake) {
  return snake.map(function(oldSegment, segmentIndex) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
    return newSegment;
  });
}
// we use map function instead of for function - forEach will do what we want for var in array
// maps act on an item and gives us information on placement with information on where we are in the array

var growSnake = function(snake) {
  var indexOfLastSegment = snake.length - 1;
  // we have an array of snake pieces, we want to identify the last segment by taking len - 1
  var lastSegment = snake[indexOfLastSegment];
  // defining last seg in snake array
  snake.push({ top: lastSegment.top, left: lastSegment.left });
  // pushes lastSegment onto the end of the array
  return snake;
}

var ate = function(snake, otherThing) {
  var head = snake[0];
  // first value of the snake array
  return CHUNK.detectCollisionBetween([head], otherThing);
}

var advanceGame = function() {
  newSnake = moveSnake(snake);

  if (ate(newSnake, snake)) { // if the snake eats itself - newSnake -> snake
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops! You ate yourself!");
  }
  if (ate(newSnake, [apple])) { // if the snake eats the apple, generate a new apple in new location
   newSnake = growSnake(newSnake);
   apple = CHUNK.randomLocation();
 }
 if (ate(newSnake, CHUNK.gameBoundaries())) { // if snake runs into the boundary
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops! you hit a wall!");
  }
/* this is our old way of producing an error when the snake hits the wall
  if (CHUNK.detectCollisionBetween([apple], snake)) { // defines interaction between apple and snake
    snake = growSnake(snake); //  adds lastSegment onto end of the Snake array
    apple = CHUNK.randomLocation(); // moves apple to random location
  }
  if (CHUNK.detectCollisionBetween(snake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("x_x");
    // ends game if collision occurs
  }
  */
  snake = newSnake
  draw(snake, apple);
}

var changeDirection = function(direction) {
  snake[0].direction = direction;
}
// changes direction of first segment


// snake variable created
var snake = [{ top: 1, left: 0, direction: "down" }, { top: 0, left: 0, direction: "down" }];
 // key-value pairs nested
 // declare var snake and assign an array
 // second item refers to additional segment on the snake

var apple = { top: 8, left: 10};

CHUNK.executeNTimesPerSecond(advanceGame, 1);
// moves game FASTER .. in intervals

CHUNK.onArrowKey(changeDirection);
// action happening in browser, defined by user input .onArrowKey

 //drawSnake(snake);
 // function call, using snake as an argument - should be called at bottom - run is last step
