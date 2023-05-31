class TicTacToe {
    constructor() {
        this.nextShape = 'X';
        if (typeof document !== 'undefined') {
            this.messageSection = document.querySelector('#message');
            this.blocks = document.querySelectorAll('#board > div');
            this.resets = document.querySelectorAll('.reset-btn');
        }
        
        this.winCombs = [
            [1,2,3], [4,5,6], [7,8,9],  //  Horizontal
            [1,4,7], [2,5,8], [3,6,9],  //  Vertical
            [1,5,9], [3,5,7]            //  Diagnoal
        ];
    }


    startGame () {
        this.blocks.forEach(block => block.addEventListener('click', e => this.blockClicked(e) ));
        this.resets.forEach(reset => reset.addEventListener('click', () => this.resetGame() ));
    }

    
    clearBlocks() {
        this.blocks.forEach(block=>block.innerText = "");
    }
        
    resetGame() {
        this.clearBlocks(this.blocks);
        this.nextShape = 'X';
        this.messageSection.style.display = 'none';
        
    }
    
    blockClicked (e) {
        e.target.innerText = this.nextShape;
        this.nextShape = this.nextShape == 'X' ? 'O' : 'X';
        this.checkDidWin();
    }
    
    checkDidWin () {
        const xWon = this.check('X');
        if (xWon) 
            return this.endGame('X');
    
        const yWon = this.check('O');
        if (yWon) 
            return this.endGame('O');
            
        // Todo: Add a counter, check if it is 9, then declare tie.
    }
    
    check(shape) {
        let cBlock, matches;
        for (let i = 0; i < this.winCombs.length; i++) {
            // For each direction reset matches to zero
            matches = 0;
            for (let n = 0; n < this.winCombs[i].length; n++) {
                cBlock = this.blocks[ this.winCombs[i][n] - 1 ];
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
    
    endGame(shape) {
        document.querySelector('#message > div > div:first-child')
            .innerText = `Player ${shape == 'X' ? '1' : '2'} won!`;
          
        this.messageSection.style.display = 'flex';
    }
    
}

export default TicTacToe;