function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}

function shuffle() {
    //Use nested loops to access each cell of the 3x3 grid
    for (var row = 1; row <= 4; row++) { //For each row of the 3x3 grid
        for (var column = 1; column <= 4; column++) { //For each column in this row

            var row2 = Math.floor(Math.random() * 4 + 1); //Pick a random row from 1 to 3
            var column2 = Math.floor(Math.random() * 4 + 1); //Pick a random column from 1 to 3

            swapTiles("cell" + row + column, "cell" + row2 + column2); //Swap the look & feel of both cells
        }
    }
}

function clickTile(row, column) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;
    if (tile != "tile16") {
        //Checks if white tile on the right
        if (column < 4) {
            if (document.getElementById("cell" + row + (column + 1)).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + row + (column + 1));
                return;
            }
        }
        //Checks if white tile on the left
        if (column > 1) {
            if (document.getElementById("cell" + row + (column - 1)).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + row + (column - 1));
                return;
            }
        }
        //Checks if white tile is above
        if (row > 1) {
            if (document.getElementById("cell" + (row - 1) + column).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + (row - 1) + column);
                return;
            }
        }
        //Checks if white tile is below
        if (row < 4) {
            if (document.getElementById("cell" + (row + 1) + column).className == "tile16") {
                swapTiles("cell" + row + column, "cell" + (row + 1) + column);
                return;
            }
        }
    }

}