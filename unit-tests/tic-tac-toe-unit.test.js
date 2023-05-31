import { assert, expect, test } from 'vitest'
import TicTacToe from '../index.js';

let game;

class Block {
    constructor () {
        this.innerText ="";
    }
    addEventListener(event, fn) {
        this[event] = fn;
    }
}

class Reset {
    addEventListener(event, fn) {
        this[event] = fn;
    }
}


function init() {
    game = new TicTacToe();
    
    game.messageSection = {
        style: {
            display: 'none'
        }
    };
    
    game.blocks = [];
    for(let i = 0; i < 9; i++)
        game.blocks.push(new Block());
        
    game.resets = [];
    for(let i = 0; i < 2; i++)
        game.resets.push(new Reset);
    
    game.startGame();
}
    
test('Test TicTacToe Class', () => {
    init();
    
    // Click first block
    game.blocks[0].click({ target: game.blocks[0] });
    // Check it is X
    expect( game.blocks[0].innerText ).toEqual('X');
    
    /* 
        Not sure what else to test further... 
        Seems like I would end up retesting e2e tests.
        But I tried :P
    */
})