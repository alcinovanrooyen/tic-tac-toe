let nextShape = 'X', messageSection;
const winCombs = [
    [1,2,3], [4,5,6], [7,8,9],  //  Horizontal
    [1,4,7], [2,5,8], [3,6,9],  //  Vertical
    [1,5,9], [3,5,7]            //  Diagnoal
];


function startGame () {
    const blocks = document.querySelectorAll('#board > div');
    blocks.forEach(block => block.addEventListener('click', blockClicked));
    
    const resets = document.querySelectorAll('.reset-btn');
    resets.forEach(reset => reset.addEventListener('click', () => resetGame(blocks)));
    
    messageSection = document.querySelector('#message');
}

function resetGame(blocks) {
    clearBlocks(blocks);
    nextShape = 'X';
    messageSection.style.display = 'none';
    
}

function clearBlocks(blocks) {
    blocks.forEach(block=>block.innerText = "");
}

function blockClicked (e) {
    e.target.innerText = nextShape;
    nextShape = nextShape == 'X' ? 'O' : 'X';
    checkDidWin();
}

function checkDidWin () {
    const xWon = check('X');
    if (xWon) 
        return endGame('X');

    const yWon = check('O');
    if (yWon) 
        return endGame('O');
        
    // Todo: Add a counter, check if it is 9, then declare tie.
}

function check(shape) {
    let cBlock, matches;
    for (let i = 0; i < winCombs.length; i++) {
        // For each direction reset matches to zero
        matches = 0;
        for (let n = 0; n < winCombs[i].length; n++) {
            cBlock = document.querySelector(`#board > div:nth-child(${winCombs[i][n]})`);
            // Tally when shape occurs 3 times in a row
            if (cBlock.innerText == shape) 
                matches++;
        }
        // If matches is equal to 3 for a certain direction, then they win.
        if (matches == 3)
            return true;
    }
    
    return false;
}

function endGame(shape) {
    document.querySelector('#message > div > div:first-child')
        .innerText = `Player ${shape == 'X' ? '1' : '2'} won!`;
      
    messageSection.style.display = 'flex';
}