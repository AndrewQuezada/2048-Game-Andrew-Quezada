let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

//localStorage saves highscore in browser
let highscore = Number(localStorage.getItem("highscore")) || 0;

let highestTile = Number(localStorage.getItem("highestTile")) || 0;

let max = 0;

//picks random num 2 or 4
function newNumber(){
    
    let newArray = [];
    const options = [2, 4];

    const randomNum = options[Math.floor(Math.random() * options.length)];
    newArray.push(randomNum);
 
    let emptyCells = [];
    
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0 ) emptyCells.push({r, c});
        }};

        if (emptyCells.length > 0){
        let cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[cell.r][cell.c] = randomNum;
    }

    //checks for biggest number on the board
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] > max) {
                max = board[r][c];
            }
            if(max > highscore){
                highscore = max;
                localStorage.setItem("highscore", highscore);
            }
            if(max == 2048){
                document.getElementById("gameover").innerHTML = `<p>You Got a 2048!</p>
            <img src="win.gif"> <br>
            <button id="new" onclick="newGame()">New Game?</button>`;
            }
            let bestTile = document.getElementById("bestTile");
            bestTile.innerHTML = max;
            bestTile.className = `best-tile tile${max}`;
        }
    }

    //makes 3d array 2d and then adds all numbers together for points
    let allNumbers = board.flat();
    console.log(allNumbers);
    let total = 0;
    for (let num of allNumbers) {
        total += num;
    }if(total > highestTile){
        highestTile = total;
        localStorage.setItem("highestTile", highestTile);
        console.log("new highscore");
    };

    document.getElementById("points3").innerHTML = highestTile;

    document.getElementById("points2").innerHTML = total;

    document.getElementById("points").innerHTML = max;
    document.getElementById("highscore").innerHTML = highscore;

    console.log(max);

    console.log(randomNum)
    playGame();
};

//draw the board
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
};

//filter empty cells and shifts numbers together.
//so i can move the number past the 0s
function emptyCells(row){
    return row.filter(num => num !== 0);
}

//slide the board
//--------fixed with AI--------------
function slide(row) {
    row = emptyCells(row);
    for (let i = 0; i < row.length - 1; i++){
        //this skips the 0s
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
//----------------------------------

function moveLeft() {
    for (let r = 0; r < 4; r++){
        board[r] = slide(board[r]);
    }
}

function moveRight() {
    for (let r = 0; r < 4; r++){
        let row = emptyCells(board[r]);
        
        for (let i = row.length - 1; i > 0; i--) {
            if (row[i] === row[i - 1]) {
                row[i] *= 2;
                row[i - 1] = 0;
                
            }
        }
        row = emptyCells(row);
        while (row.length < 4){
            row.unshift(0);
        }
        board[r] = row;
    }
}

function moveUp() {
    for (let c = 0; c < 4; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < 4; r++) {
            board[r][c] = row[r];
        }
    }
}

function moveDown() {                
    for (let c = 0; c < 4; c++){
        // Collect column from bottom to top
        let row = [board[3][c], board[2][c], board[1][c], board[0][c]];
        row = slide(row); 
        
        // Put values back into the board from bottom to top
        for (let r = 0; r < 4; r++) {
            board[3 - r][c] = row[r];
        }
    }
}

//key press left right up down
document.addEventListener('keyup',removeKey);

function removeKey(e){
    
    let moved = false;

    if (e.code === "ArrowLeft"){
        moved = moveLeft();
        moved = true;
    } else if (e.code === "ArrowRight"){
        moved = moveRight();
        moved = true;
    } else if (e.code === "ArrowUp"){
        moved = moveUp();
        moved = true;
    } else if (e.code === "ArrowDown") {
        moved = moveDown();
        moved = true;
    }
    if (moved) {
        playGame();
        newNumber();
    }
    if (!isFull()) {
        moved = false;
    }
    else {
        console.log("Board is full!");
        document.removeEventListener("keyup", removeKey)
        document.getElementById("gameover").innerHTML = `
        <p>Game Over</p>
        <img src="lose.jfif"/>
        <br>
        <button id="new" onclick="newGame()">New Game?</button>
        `;
    }
}

//reloads when new game is cliccked
function newGame(){
    window.location.reload();
}

//checks if the board is full
function isFull(){
    for(let r = 0; r < 4; r++){
        for(let c = 0; c< 4; c++){

            //checks for empty spaces if empty return false
            if(board[r][c] === 0) return false;

            //checks for row merges if the same return false
            if (c < 3 && board[r][c] === board[r][c + 1]) return false;

            //checks for colioum merges if the same return false
            if(r < 3 && board[r][c] === board[r + 1][c]) return false;
        } 
    }
    return true;
};

//cheat to test win
//use iWin(); in the comand
function iWin() {
    board = [
        [2048, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    max = 2048;
    playGame();
    document.getElementById("gameover").innerHTML = `<p>You Got a 2048!</p>
            <img src="win.gif"> <br>
            <button id="new" onclick="newGame()">New Game?</button>`;
}

newNumber();