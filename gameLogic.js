// define the elements in the game board 
const gridSize = 4; 
const height = 610; 
const width = 550;
const cellSize = width / (gridSize+2);
const borderline = 8; 
const dotSize = 8; 
const fontSize = 25;

// GAME BOARD COLOURS
const boardColour = "#D7DBDC";
const borderColour = "#505050";
const dotColour = "#373737";

// PLAYER COLOUR
// Player 1
const P1Colour = "#DB1F48";
const P1ColourHover = "#FC9EB2";
const P1ColourWin = "#AD1939";
var P1_ShowColour;

//Player 2
const P2Colour = "#278AB0";
const P2ColourHover = "#76A8C2";
const P2ColourWin = "#1E6A87";
var P2_ShowColour;

// Player 3
const P3Colour = "#1DC690";
const P3ColourHover = "#7FC6AB";
const P3ColourWin = "#16946C";
var P3_ShowColour;

// define each side of a box
const Border = {
    BOT: 0,
    LEFT: 1,
    RIGHT: 2,
    TOP: 3
}

// create variables that will be used to keep track of what is going in the game
// which box the player is currently looking at, who's turn is it to create the line
var currentBox, player, boxes;
//  variables to keep track of each player's score so we can tell who wins. 
var scorePlayer1, scorePlayer2, scorePlayer3;

// GAME BOARD
var playingBoard = document.createElement("canvas");
playingBoard.height = height;
playingBoard.width = width;
// attach the canvas to the html page
document.body.append(playingBoard);
var playingBoardShape = playingBoard.getBoundingClientRect();


// create the context for the canvas so that we can access these data in different locations and functions of the js. 
var currentObject = playingBoard.getContext("2d");
currentObject.lineWidth = borderline;
currentObject.textAlign = "center";
currentObject.textBaseline = "middle";

// start a new game
startGame();
setUpGameCanvas();

// add event listeners so the program knows when a player is hovering over a line or decides to select a line.
playingBoard.addEventListener("mousemove", mouseHandler); // mouse hovering over the lines
playingBoard.addEventListener("click", clickHandler); // player clicks a line 
     
// create a function to set up the elements on the board of the game. 
function setUpGameCanvas() {
    createPlayingBoard(); // create the board of the game and the border
    createBox(); // create each box that will be created when the player plays 
    createAllDots(); // create the initial dots on the board
    createScoreBoard(); // create the scores of each player
    
    requestAnimationFrame(setUpGameCanvas); // sets up the animation for the game. 
}

// create a handler that will know what to do when a user clicks a specific spot on the board
function clickHandler(e) {
    selectBoxEdge();
}

// create handler that will know when a player has hovered over a certain location on the playing board 
function mouseHandler(e) {
    // find where the mouse position is depending on the canvas, not the whole page. 
    let x = e.clientX - playingBoardShape.left;
    let y = e.clientY - playingBoardShape.top;

    // highlight the square's side
    potentialLine(x, y);
}

// create the background and the border of where the game will lie
function createPlayingBoard() {
    // colour the board and border
    currentObject.fillStyle = boardColour;
    currentObject.strokeStyle = borderColour;
    // create where the board and border will be on the canvas 
    currentObject.fillRect(0, 0, width, height);
    currentObject.strokeRect(4, 4, width - 8, height - 8);
}

// create the individual dot and add the style of the dot 
function create1Dot(xcoord, ycoord) {
    currentObject.beginPath();
    // where the dot will position itself
    currentObject.arc(xcoord, ycoord, dotSize, 0, Math.PI * 2);
    // colour the dot
    currentObject.fillStyle = dotColour;
    currentObject.fill();
    currentObject.closePath;
}

// create all the dots on the grid, this will create the x and y axis of where the dot is to be located
function createAllDots() {
    // get the x coordinate 
    for (let i = 1; i < gridSize + 2; i++) {
        // get the y coordinate 
        for (let j = 1; j < gridSize + 2; j++) {
            // create the dot given the location from the for loop
            create1Dot(cellSize * (j), cellSize * (i) - 20);
        }
    }
}

// create the lines connecting the dots
function createLine(x1coord, y1coord, x2coord, y2coord, linecolour) {
    currentObject.beginPath();
    // style of the line
    currentObject.strokeStyle = linecolour;
    currentObject.lineWidth = 8;
    // create the line from location (x1,y1) to (x2,y2)
    currentObject.moveTo(x1coord, y1coord);
    currentObject.lineTo(x2coord, y2coord);
    // create the actual line
    currentObject.stroke();
    currentObject.closePath();
}

// decide the colour of each player displayed on the scoreboard to check to see who's turn it is
function decideColourOfScoreBoard() {
    // if it is the player's turn, their colour will be darker, if it is not their turn, then the colour will be lighter. 
    // player 1
    if (player == 1) {
        P1_ShowColour = P1Colour;
    } else {
        P1_ShowColour = P1ColourHover
    }

    // player 2
    if (player == 2) {
        P2_ShowColour = P2Colour;
    } else {
        P2_ShowColour = P2ColourHover
    }

    // player 3
    if (player == 3) {
        P3_ShowColour = P3Colour;
    } else {
        P3_ShowColour = P3ColourHover
    }            
}

// display each player and their respective score. 
function createScoreBoard() {
    // decide colour depending on if it's the player's turn or not 
    decideColourOfScoreBoard();

    // display player title 
    createText("Player 1", width * 0.18, 505, P1_ShowColour, fontSize);
    createText("Player 2", width * 0.5, 505, P2_ShowColour, fontSize);
    createText("Player 3", width * 0.82, 505, P3_ShowColour, fontSize);
  
    // display player's score
    createText(scorePlayer1, width * 0.18, 560, P1_ShowColour, fontSize * 2);
    createText(scorePlayer2, width * 0.5, 560, P2_ShowColour, fontSize * 2);
    createText(scorePlayer3, width * 0.82, 560, P3_ShowColour, fontSize * 2);
}

// store the winner and their corresponding score into the local storage to use in the result's page. 
function storeWinners() {
    // store winner into local storage
    if (scorePlayer1 == scorePlayer2 && scorePlayer1 > scorePlayer3) {
        localStorage.setItem('Results', "A TIE: Player 1 and Player 2!")
    } else if (scorePlayer1 == scorePlayer3 && scorePlayer1 > scorePlayer2) {
        localStorage.setItem('Results', "A TIE: Player 1 and Player 3!")
    } else if (scorePlayer2 == scorePlayer3 && scorePlayer2 > scorePlayer1) {
        localStorage.setItem('Results', "A TIE: Player 2 and Player 3!")
    } else if (scorePlayer1 > scorePlayer3 && scorePlayer1 > scorePlayer2) {
        localStorage.setItem('Results', "Player 1!")
    } else if (scorePlayer2 > scorePlayer3 && scorePlayer2 > scorePlayer1) {
        localStorage.setItem('Results', "Player 2!")
    } else if (scorePlayer3 > scorePlayer1 && scorePlayer3 > scorePlayer2) {
        localStorage.setItem('Results', "Player 3!")
    }

    // store the scores into local storage 
    localStorage.setItem('p1-results', scorePlayer1);
    localStorage.setItem('p2-results', scorePlayer2);
    localStorage.setItem('p3-results', scorePlayer3);
}

// create the box when 4 sides of a line end up connecting
function createBox() {
    // loop through each element in the box array 
    for (let i=0; i < boxes.length; i++) {
        // repeat, since it's a 2d matrix. 
        for (let j=0; j < boxes[i].length; j++) {
            // create each side of the box and fill the colour in 
            boxes[i][j].fillTheBox();
            boxes[i][j].createBoxSides();
        }
    }
}

// display text onto the playing board 
function createText(inputtext, x, y, textcolour, fontsize) {
    // style of the text
    currentObject.fillStyle = textcolour;
    currentObject.font = fontsize + "px Verdana";
    // display the text 
    currentObject.fillText(inputtext, x, y);
}

// get the colour of the line to be createn corresponding to the player's turn. 
function getPlayerTurnColour(player) {
    if (player == 1) {
        return P1Colour;
    } else if (player == 2) {
        return P2Colour;
    } else if (player == 3) {
        return P3Colour;
    }
}

// get the colour of the line and the winner's box fill corresponding to the player's turn
function getPlayerTurnColourHover(player) {
    if (player == 1) {
        return P1ColourHover;
    } else if (player == 2) {
        return P2ColourHover;
    } else if (player == 3) {
        return P3ColourHover;
    }
}        

// get the colour of the text within the box of the player who closed off the box, this colour is darker so it's shown more
function getPlayerTurnColourWin(player) {
    if (player == 1) {
        return P1ColourWin;
    } else if (player == 2) {
        return P2ColourWin;
    } else if (player == 3) {
        return P3ColourWin;
    }
}

// get the text that should be shown in the box when the player has closed off the box. 
function getBoxWinnerText(player) {
    if (player == 1) {
        return "P1";
    } else if (player == 2){
        return "P2";
    } else if (player == 3){
        return "P3";
    }
}

// potential line that the player may or may not select, this line will be highlighted for the user to know they can select here. 
function potentialLine(x, y) {

    // empty any of the previous highlighting, so that there are no duplicate lines showing at one time. 
    for (let i=0; i < boxes.length; i++) {
        // iterate through each element in the box 
        for (let j=0; j < boxes[i].length; j++) {
            // clear highlights 
            boxes[i][j].potentialLineShown = null;
        }
    }
    
    // reinitialise currentBox
    currentBox = [];
    // look through each box in the game
    let rows = boxes.length;
    let cols = boxes[0].length;

    LOOP1:  for (let i = 0; i < boxes.length; i++) {
        LOOP2:      for (let j = 0; j < boxes[i].length; j++) {
                        // check to see if the mouse is within a given box 
                        if (boxes[i][j].mouseInside(x, y)) {
                            // show the potential line as highlighted for the current position that the player is looking at
                            let currentBoxSide = boxes[i][j].potentialLine(x, y);
                            // if a side of a box as already been selected, add this into the currentBox array
                            if (currentBoxSide != null) {
                                // create object with where the current box lies on the grid, the row and column number 
                                currentBox[currentBox.length] = {row: i, col: j};
                            }
    
                            // each box share a side, the left side of one is the same as the right side of another
                            // figure out which sides are next to each other, and share the same side
                            let row = i, column = j, potentialLineDrawn, shared = true;
                            // if the current box side is the left side and there is a shared side, then j > 0 because it's the right side of another 
                            if (currentBoxSide == Border.LEFT && j > 0) {
                                // the left side that is shared will be - 1 (to the left) 
                                column = j - 1;
                                // the shared highlight here will be the Right side 
                                potentialLineDrawn = Border.RIGHT;
                            // the current box side is the right side, which is shared with a box that is the left side. 
                            } else if (currentBoxSide == Border.RIGHT && j < cols - 1) {
                                // the right side that is shared will be + 1 (to the right) 
                                column = j + 1;
                                // the shared highlight here will be the Left side                             
                                potentialLineDrawn = Border.LEFT;
                            // the current box side is the top side, which is shared with a box that is the bottom side.    
                            } else if (currentBoxSide == Border.TOP && i > 0) {
                                // the top side that is shared will be - 1 (down direction) 
                                row = i - 1;
                                // the shared highlight here will be the Bottom side 
                                potentialLineDrawn = Border.BOT;
                            // the current box side is the bottom side, which is shared with a box that is the top side.
                            } else if (currentBoxSide == Border.BOT && i < rows - 1) {
                                // the bottom side that is shared will be + 1 (up direction) 
                                row = i + 1;
                                // the shared highlight here will be the Top side 
                                potentialLineDrawn = Border.TOP;
                            } else {
                                // if none are true, the side is not shared with anything (border)
                                shared = false;
                            }
    
                            // if we have a shared side, set the potential line to the line that was just calculated. 
                            if (shared) {
                                boxes[row][column].potentialLineShown = potentialLineDrawn;
                                // append the current box we are looking at into the array 
                                currentBox[currentBox.length] = {row: row, col: column};
                            }
                        }
        }
    }
}

// start the actual game. 
function startGame() {
    // initialize the currentbox and the box array to empty
    currentBox = [];
    boxes = [];
    // always start with player 1
    player = 1;

    // initialize player scores to 0
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    scorePlayer3 = 0;

    // create a new box for each row and column in the 2d array. 
    for (let i = 0; i < gridSize; i++) {
        boxes[i] = [];
        for (let j = 0; j < gridSize; j++) {
            boxes[i][j] = new Box(cellSize * (j + 1), cellSize * (i + 1) - 20, cellSize, cellSize);
        }
    }
}

// select the side of the box corresponding to the current player click. 
function selectBoxEdge() {
    // if the current box is empty, return nothing 
    if (currentBox == null || currentBox.length == 0) {
        return;
    } else {
    // permanently draw the side of the box that the player has selected
        let completedBox = false;
        for (let i = 0; i < currentBox.length; i++) {
            if (boxes[currentBox[i].row][currentBox[i].col].selectBoxEdge()) {
                completedBox = true;
            }
        }

        // empty the currentBox so it can be reused 
        currentBox = [];

        // check to see if the game has ended and store the winner
        if (completedBox) {
            // if the total accumulated scores is equal to the number of boxes the grid has, the game ended 
            if (scorePlayer1 + scorePlayer2 + scorePlayer3 == gridSize * gridSize) {
                // store the winner and their corresponding results 
                storeWinners();
                // move to the next page to display 
                setTimeout(function () { location.replace("results.html") }, 2000);
            }
        // the game has not ended yet, change the current player 
        } else {
            // change player's turn depending on who was the previous player 
            if (player == 1) {
                player = 2;
            } else if (player == 2) {
                player = 3;
            } else if (player == 3) {
                player = 1;
            }
        }

    }

}

// create a box object along with it's corresponding functions
function Box(xCoord, yCoord, boxWidth, boxHeight) {
    // dimensions
    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;

    // sides of the boxes 
    this.bottom = yCoord + boxHeight;
    this.left = xCoord;
    this.right = xCoord + boxWidth;
    this.top = yCoord;

    // additional elements 
    this.potentialLineShown = null;
    this.numberOfSelectedLines = 0;
    this.ownerOfBox = null;

    // variables to see which side is closest to the mouse
    this.bottomSide = { ownerOfBox: null, clicked: false };
    this.leftSide = { ownerOfBox: null, clicked: false };
    this.rightSide = { ownerOfBox: null, clicked: false };
    this.topSide = { ownerOfBox: null, clicked: false };

    // checks to see if the mouse is hovering within a box, and which box this is. 
    this.mouseInside = function (xCoord, yCoord) {
        return xCoord >= this.left && xCoord < this.right && yCoord >= this.top && yCoord < this.bottom;
    }

    // fill in the box depending on who is the owner of the box (who completed the box)
    this.fillTheBox = function () {
        // if no one has completed a box yet, do nothing
        if (this.ownerOfBox == null) {
            return;
        } else {
            // fill in the box with the corresponding colour
            currentObject.fillStyle = getPlayerTurnColourHover(this.ownerOfBox);
            // draw the shape of the box background
            currentObject.fillRect(this.left, this.top, this.boxWidth, this.boxHeight);
        }
    }

    // create the line that the current player has selected.
    this.createSelectedLine = function(boxSide, colourOfLine) {
        switch(boxSide) {
            // if the border of the box is the top side, then draw a line on the top side. 
            case Border.TOP:
                createLine(this.left, this.top, this.right, this.top, colourOfLine);
                break;
            // if the border of the box is the bottom side, then draw a line on the bottom side. 
            case Border.BOT:
                createLine(this.left, this.bottom, this.right, this.bottom, colourOfLine);
                break;
            // if the border of the box is the left side, then draw a line on the left side. 
            case Border.LEFT:
                createLine(this.left, this.top, this.left, this.bottom, colourOfLine);
                break;
            // if the border of the box is the right side, then draw a line on the right side. 
            case Border.RIGHT:
                createLine(this.right, this.top, this.right, this.bottom, colourOfLine);
                break;
        }
    }

    // create the side of the box that is selected by the user, this will get the current player's colour
    this.createBoxSides = function () {
        // if the current player is just choosing a line then create a line that is lighter in colour. 
        if (this.potentialLineShown != null) {
            this.createSelectedLine(this.potentialLineShown, getPlayerTurnColourHover(player));
        }
        // if the current player is has selected the line then create a line with the corresponding colour. 
        if (this.bottomSide.clicked) {
            this.createSelectedLine(Border.BOT, getPlayerTurnColour(this.bottomSide.ownerOfBox));
        }
        if (this.leftSide.clicked) {
            this.createSelectedLine(Border.LEFT, getPlayerTurnColour(this.leftSide.ownerOfBox));
        }
        if (this.rightSide.clicked) {
            this.createSelectedLine(Border.RIGHT, getPlayerTurnColour(this.rightSide.ownerOfBox));
        }
        if (this.topSide.clicked) {
            this.createSelectedLine(Border.TOP, getPlayerTurnColour(this.topSide.ownerOfBox));
        }
    }

    // indicate which line can be potentially selected by the user 
    this.potentialLine = function(xCoord, yCoord) {

        // calculate the distance from the mouse and each side
        let topDistance = yCoord - this.top;
        let bottomDistance = this.bottom - yCoord;
        let leftDistance = xCoord - this.left;
        let rightDistance = this.right - xCoord;

        // find which side the mouse is closest to, this is the minimum distance between all the ones calculated.
        let closestEdge = Math.min(bottomDistance, leftDistance, rightDistance, topDistance);

        // colour the edge that the mouse is the closest to
        // only colour if the edge has not yet been clicked. 
        if (closestEdge == topDistance && !this.topSide.clicked) {
            this.potentialLineShown = Border.TOP;
        } else if (closestEdge == bottomDistance && !this.bottomSide.clicked) {
            this.potentialLineShown = Border.BOT;
        } else if (closestEdge == leftDistance && !this.leftSide.clicked) {
            this.potentialLineShown = Border.LEFT;
        } else if (closestEdge == rightDistance && !this.rightSide.clicked) {
            this.potentialLineShown = Border.RIGHT;
        }

        // return the potential edge and show on screen for the user to know they can select here. 
        return this.potentialLineShown;
    }

    // the player actually selects the side
    this.selectBoxEdge = function () {
        // if there is no highlighted line just return
        if (this.potentialLineShown == null) {
            return;
        }

        // draw the line that the current player has decided to click with the corresponding colour
        // break out of each case when found because we don't want to set owners for something they do not own
        switch (this.potentialLineShown) {
            case Border.BOT:
                // set the owner to the current player if clicked and set the clicked value to true  
                this.bottomSide.ownerOfBox = player;
                this.bottomSide.clicked = true;
                break; 
            case Border.LEFT:
                // set the owner to the current player if clicked and set the clicked value to true  
                this.leftSide.ownerOfBox = player;
                this.leftSide.clicked = true;
                break;
            case Border.RIGHT:
                // set the owner to the current player if clicked and set the clicked value to true
                this.rightSide.ownerOfBox = player;
                this.rightSide.clicked = true;
                break;
            case Border.TOP:
                // set the owner to the current player if clicked and set the clicked value to true
                this.topSide.ownerOfBox = player;
                this.topSide.clicked = true;
                break;
        }
        // set the potentialLineShown to empty so that the variable can be used again for the next player 
        this.potentialLineShown = null;

        // increase the number of lines that are selected for a current box, so that we know when a box has been completed
        this.numberOfSelectedLines++;
        // a box has 4 sides, so whoever completed the box will become the owner of the box 
        if (this.numberOfSelectedLines == 4) {
            this.ownerOfBox = player;

            // once a box has been completed, the score will need to be updated
            if (player == 1) {
                scorePlayer1++;

            } else if (player == 2) {
                scorePlayer2++;
            } else if (player == 3) {
                scorePlayer3++;
            }

            // return true if the box has been completed
            return true;
        }

        // return false if the box has not been completed
        return false;
    }
}

