// get the variables from gameLogic.js
let p1Results = localStorage.getItem('p1-results');
let p2Results = localStorage.getItem('p2-results');
let p3Results = localStorage.getItem('p3-results');
let winner = localStorage.getItem('Results');

// set the dimensions height and width to the window's dimensions
var width = window.innerWidth;
var height = window.innerHeight;

// create a canvas where we are going to display the results and score board
var resultCanvas = document.createElement("canvas");
resultCanvas.height = height;
resultCanvas.width = width;
// attach the canvas to the html page
document.body.append(resultCanvas);
var resultCanvasScreen = resultCanvas.getBoundingClientRect();

// create the context for the canvas so that we can access these data in different locations and functions of the js. 
var currentObject = resultCanvas.getContext("2d");
currentObject.lineWidth = 8;
currentObject.textAlign = "center";
currentObject.textBaseline = "middle";

// display text onto the results page 
function createText(inputtext, x, y, textcolour, fontsize) {
    // style of the text
    currentObject.fillStyle = textcolour;
    currentObject.font = fontsize + "px Verdana";
    // display the text 
    currentObject.fillText(inputtext, x, y);
}

// display the winner in the middle 
createText(winner, width / 2, height/ 30, "#EDEDED", 50)

// display the score board title in the middle 
createText("Score Board:", width / 2, height/ 8, "#EDEDED", 30)

// display the player and their corresponding scores in 1/3, 1/2, 2/3 of the page.
createText("Player 1:   " + p1Results, width / 5, height/ 5, "#DB1F48", 20)
createText("Player 2:   " + p2Results, width / 2, height/ 5, "#278AB0", 20)
createText("Player 3:   " + p3Results, width / 1.2, height/ 5, "#1DC690", 20)


