// File: fsjs-p1-v2-c1-fernainggolan/index.js

"use strict"
class PacMan {
  
  #skippedPositions
  #startPosition 
  
  constructor(height, width, countdown=3) {
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.points = 0;
    this.generateBoard();
    this.#startPosition = this.randomStartPosition();
  }
  
  randomStartPosition() {
    let row = Math.floor(Math.random() * this.height);
    let col = Math.floor(Math.random() * this.width);
    return [row, col];
  }
  
  validateInputs() {
    let height = parseInt(process.argv[2]);
    let width = parseInt(process.argv[3]);
    let countdown = parseInt(process.argv[4]);
    
    if (isNaN(height) || height < 3) {
      console.log("Input height minimum 3!");
      return false;
    }
    
    if (isNaN(width) || width < 3) {
      console.log("Input width minimum 3!");
      return false;
    }
    
    if (!isNaN(countdown) && countdown < 1) {
      console.log("Input countdown do not accept minus!");
      return false;
    }
    
    return true;
  }
  
  countdownGame() {
    let countdown = this.countdown;
    for (let i = countdown; i >= 0; i--) {
      this.clearScreen();
      console.log(`Countdown: ${i}`);
      this.sleep(1000);
    }
    this.clearScreen();
  }
  
  generateBoard() {
    this.board = [];
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push("o");
      }
      this.board.push(row);
    }
  }
  play() {
    
    if (this.height < 3) {
      console.log("Input height minimum 3!");
      return;
    }
    if (this.width < 3) {
      console.log("Input width minimum 3!");
      return;
    }
    if (this.countdown < 1) {
      console.log("Input countdown do not accept minus!");
      return;
    }
  
    
    const board = this.generateBoard();
  
    
    let [i, j] = this.startPosition;
    board[i][j] = "😀";
  
    
    const skippedPositions = [];
  
    
    console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
    console.log(`Start in position i: ${i}; j : ${j}`);
    console.log(`Your point now : ${this.points}`);
    this.printBoard(board);
  
    
    this.countdownGame();
  
    
    let gameEnd = false;
    while (!gameEnd) {
      const [newI, newJ] = this.movePacMan(i, j, skippedPositions);
      skippedPositions.push([i, j]);
      i = newI;
      j = newJ;
  
      
      if (j === this.width) {
        gameEnd = true;
        console.log("FINISH");
        console.log(`Posisi yang di lompati : ${JSON.stringify(skippedPositions)}`);
        return;
      }
  
      
      board[i][j] = "😀";
      this.points++;
  
      
      console.clear();
      console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
      console.log(`Start in position i: ${this.startPosition[0]}; j : ${this.startPosition[1]}`);
      console.log(`Your point now : ${this.points}`);
      this.printBoard(board);
  
      
      this.sleep(500);
    }
  }
  sleep(milliseconds){
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  clearScreen () {
    
    
    console.clear();
  }
}


// File: fsjs-p1-v2-c1-fernainggolan/pacManAdvance.js

"use strict"


const PacMan = require('./index');
class PacManAdvance extends PacMan {
  

 
    constructor(height, width, playedBy) {
      super(height, width);
      this.countdown = 5;
      this.symbol = ':)';
      this.zonkPoints = 0;
      this.playedBy = playedBy;
    }
  }
  
  



const pacManAdvance = new PacManAdvance()  

pacManAdvance.play()

module.exports = PacManAdvance;

// File: fsjs-p1-v2-c1-fernainggolan/pacManSad.js

"use strict"


const PacMan = require('./pacMan');
class PacManSad extends PacMan {
  constructor(height, width) {
    super(height, width);
    this.countdown = 4;
    this.symbol = ':(';
  }
}



const pacManSad = new PacManSad()  

pacManSad.play()

module.exports = PacManSad;

