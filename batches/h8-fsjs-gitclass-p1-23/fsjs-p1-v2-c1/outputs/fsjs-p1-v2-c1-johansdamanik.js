// File: fsjs-p1-v2-c1-johansdamanik/index.js

"use strict"
class PacMan {
  
  #skippedPositions;
  #startPosition;
  constructor(height, width, countdown = 3, symbol = '☺︎') {
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.point = 0;
    this.#skippedPositions = []
    this.#startPosition = this.randomStartPosition();
    this.symbol = symbol;
  }
  get skippedPositions() {
    return this.#skippedPositions;
  }
  get startPosition() {
    return this.#startPosition;
  }
  set startPosition(value) {
    this.#startPosition = value;
  }
  
  validate() {
    if (this.height < 3) {
      console.log(`Whoopps! You must input a 'Height' number that is equal to or greater than 3.`)
      return false;
    }
    if (this.width < 3) {
      console.log(`Whoopps! You must input a 'Width' number that is equal to or greater than 3.`)
      return false;
    }
    if (Number(this.countdown) < 0) {
      console.log(`Whoopps! The number cannot be negative.`)
      return false;
    }
    return true;
  }
  randomStartPosition() {
    return [Math.floor(Math.random() * this.height), Math.floor(Math.random() * this.width)];
  }
  countdownGame() {
    for (let count = this.countdown; count >= 0; count--) {
      console.log(`COUNTDOWN: ${count}`);
      const row = `${count} `.repeat(this.width);
      console.log(`${row}\n`.repeat(this.height));
      this.sleep(1000);
      this.clearScreen();
    }
  }
  generateBoard() {
    return Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => 'o')
    );
  }
  play() {
    if (!this.validate()) return;
    this.countdownGame();
    let startPos = this.startPosition;
    let [i, j] = this.startPosition;
    let board = this.generateBoard();
    for (i; i < this.height; i++) {
      for (j; j < this.width; j++) {
        this.clearScreen();
        this.point++
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}\nStarting in position i: ${startPos[0]}; j: ${startPos[1]}\nYour point now: ${this.point}`);
        
        board[i][j] = this.symbol;
        console.log(board.map(row => row.join(' ')).join('\n'));
        this.sleep(1000);
        board[i][j] = '.'
      }
      j = 0;
    }
   
    console.log('FINISH\n');
    let result = this.skippedPositions;
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 'o') {
          result.push([i, j]);
        }
      });
    });
    console.log(`Posisi yang dilompati :\n`, result);
  }
  sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  clearScreen() {
    
    
    console.clear();
  }
}
const args = process.argv.slice(2); 
const height = +args[0]; 
const width = +args[1]; 
let countdown = +args[2]; 
if (Number.isNaN(countdown)) {
  countdown = undefined;
}
const game = new PacMan(height, width, countdown); 
module.exports = PacMan;

// File: fsjs-p1-v2-c1-johansdamanik/pacManAdvance.js

"use strict"
let PacMan = require("./index");
class PacManAdvance extends PacMan {
  constructor(height, width, name) {
    super(height, width, 5);
    this.symbol = '☻';
    this.playedBy = name
    this.zonkPoints = 0;
  }
  validate() {
    if (this.height % 2 === 0 && this.width % 2 === 0) {
      if (height === width && height >= 4) {
        return true;
      } else {
        console.log(`I know you want to play this game, but the height and width must be equal and at least 4. ☻`)
        return false;
      }
    } else {
      console.log(`I know you want to play this game, but the height and width must be even numbers. ☻`)
      return false;
    }
  }
  play() {
    if (!this.validate()) return;
    this.countdownGame()
    let startPos = this.startPosition;
    let [i, j] = this.startPosition;
    let board = this.generateBoard();
    const midRow = this.height / 2 - 1;
    const midCol = this.width / 2 - 1;
    
    board[midRow][midCol] = '.';
    board[midRow][midCol + 1] = '.';
    board[midRow + 1][midCol] = '.';
    board[midRow + 1][midCol + 1] = '.';
    for (i; i < this.height; i++) {
      for (j; j < this.width; j++) {
        this.clearScreen();
        if (board[i][j] === '.') {
          this.zonkPoints++
        } else {
          this.point++
        }
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}\nStarting in position i: ${startPos[0]}; j: ${startPos[1]}\nYour point now: ${this.point}\nYour zonk point now: ${this.zonkPoints}`);
        board[i][j] = this.symbol;
        console.log(board.map(row => row.join(' ')).join('\n'));
        this.sleep(1000);
        board[i][j] = '.'
      }
      j = 0;
    }
    console.log('FINISH\n');
    let result = this.skippedPositions;
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === 'o') {
          result.push([i, j]);
        }
      });
    });
    console.log(`Posisi yang dilompati :\n`, result);
    console.log(`Dimainkan oleh ${this.playedBy}`);
  }
}
let [height, width, name] = process.argv.slice(2);
const pacManAdvance = new PacManAdvance(height, width, name);
pacManAdvance.play();

// File: fsjs-p1-v2-c1-johansdamanik/pacManSad.js

"use strict"
let PacMan = require("./index");
class PacManSad extends PacMan{
  constructor(height, width) {
    super(height, width, 4);
    this.symbol = '☹︎';
  }
  validate() {
    if (isNaN(this.height) || isNaN(this.width)) {
      console.log(`I'm so sad ☹︎ . You didn't input any numbers.`);
      return false;
    } else if (this.height < 3 || this.width < 3) {
      console.log(`I'm so sad ☹︎ . Height and width must be greater than or equal to 3.`);
      return false;
    } else if (this.height % 2 === 0 || this.width % 2 === 0) {
      console.log(`I'm so sad ☹︎ . Height and width must be odd numbers.`);
      return false;
    } else {
      return true;
    }
  }
}
let [height, width] = process.argv.slice(2);
const pacManSad = new PacManSad(height, width)
pacManSad.play()

