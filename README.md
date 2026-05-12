# 2048-Game-Andrew-Quezada

2048 is a browser based game players slide tiles to make the 2048 tile inspired by Gabriele Cirull's game 2048. Players use arrow keys to move numbered tiles on a 4x4 grid and tiles with the same value merge into one when they collide, doubling in value, with the goal of creating a "2048" tile.

- Random number generation, 2 or 4
- Controls/input with arrow keys
- Number merging
- High score with local storage

Open the game in your browser 
2. A number (2 or 4) will spawn
3. Use the arrow keys (Left up right down)
4. Try to get the 2048 tile

1. Game Board Setup

The board is stored as a 2D array

let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

A value of 0 means the tile is empty.

2. Random Number Generation

The newNumber() function randomly places a 2 or 4 in an empty space on the board.

const options = [2, 4];
const randomNum = options[Math.floor(Math.random() * options.length)];

The function also:

Finds empty cells
Updates scores
Detects wins
Saves high scores
Remakes the board

3. Drawing the Board

The playGame() function creates the HTML table

function playGame() {
  let html = "<table>";

  for(let i = 0; i < 4; i++){
    html += "<tr>";

    for(let j = 0; j < 4; j++) {
      let num = board[i][j] === 0 ? "" : board[i][j];
      html += `<td class="tile tile${num}">${num}</td>`;
    }

    html += "</tr>";
  }

  html += "</table>";

  document.getElementById("grid").innerHTML = html;
}

This updates the visual game board every move.

4. Tile Movement Logic

The game supports moving with

Left
Right
Up
Down

The slide() function handles merging matching numbers.

function slide(row) {
  row = emptyCells(row);

  for (let i = 0; i < row.length - 1; i++){

    if (row[i] === row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
    }
  }

  row = emptyCells(row);

  while (row.length < 4){
    row.push(0);
  }

  return row;
}

5. Keyboard Controls

The game listens for arrow key presses.

document.addEventListener('keyup', removeKey);

The player controls movement using:

Left Arrow
Right Arrow
Up Arrow
Down Arrow

6. Game Over Detection

The isFull() function checks if:

The board has empty spaces
Any merges are still possible
if(board[r][c] === 0) return false;

If there are no moves, the game ends.

7. Win Detection

When the player reaches the 2048 tile:

if(max == 2048){

A win message and animation are displayed.

9. Cheat/Test Function

A testing function lets you instantly trigger a win.

function iWin() {
  board = [
    [2048, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  max = 2048;
  playGame();
}

Use in the browser console:

iWin();

Example HTML Structure:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2048</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/x-icon" href="2048.png">
</head>
<body>
    <h1>
        2048
        <span id="bestTile" class="best-tile">2</span>
    </h1>

    <p class="message2">
        <span class="score-box">
            Best Tile: <strong id="highscore"></strong>
        </span>

        <span class="score-box">
            Best Score: <strong id="points3"></strong> K
        </span>
    </p>
    <p class ="message">Highest Tile: <strong id="points"></strong> &emsp; <span id ="message">Score: <strong id="points2"></strong> K</span></p>
    <p id="gameover"></p>
    <p>Join the number and get the 2048 tile!</p>
    <div id="grid" class="grid"></div>
    <P id="ins">How to play: <strong>use arrow keys to mave the numbers (&#x2190; &#x2191; &#x2192; &#x2193;)</strong></P>

    <script src="script.js"></script>
</body>
</html>

