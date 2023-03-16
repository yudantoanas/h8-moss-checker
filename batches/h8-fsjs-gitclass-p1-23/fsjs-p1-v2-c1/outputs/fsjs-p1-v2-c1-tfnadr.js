// File: fsjs-p1-v2-c1-tfnadr/index.js

"use strict"
class PacMan {
  
  #skippedPositions;
  #startPositions;
  constructor(height, width, countDown = 3, Symbol = '☺︎') {
    this.height = height;
    this.width = width;
    this.countDown = countDown;
    this.point = 0
    this.#skippedPositions = [];
    this.#startPositions = this.randomStartPosition();
    this.Symbol = Symbol 
  }
  
  validator() {
    if (this.height < 3) {
      console.log(`Input height minimum 3`);
      return false;
    }
    if (this.width < 3) {
      console.log(`Input width minimum 3`);
      return false;
    }
    if (this.countDown < 0) {
      console.log(`Input countdown do not accept minus!`);
      return false;
    }
  }
  randomStartPosition() {
    let x = Math.floor(Math.random() * this.height);
    let y = Math.floor(Math.random() * this.width)
    let result = [x, y];
    return result;
  }
  set skippedPositions(value){
    this.skippedPositions = value
  }
  get skippedPositions(){
    return this.#skippedPositions
  }
  set startPositions(value){
    this.startPositions = value
  }
  get startPositions(){
    return this.#startPositions
  }
  countdownGame() {
    let count = this.countDown;
    while (count >= 0) {
      console.log(`COUNTDOWN: ${count}`);
      for (let i = 0; i < this.height; i++) {
        let row = '';
        for (let j = 0; j < this.width; j++) {
          row += `${count} `;
        }
        console.log(row);
      }
      this.sleep(1000);
      this.clearScreen();
      count--;
    }
  }
  generateBoard() {
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push('o');
      }
      result.push(row)
    }
    return result;
  }
  playBoard(board) {
    for (let i = 0; i < board.length; i++) {
      let row = ''
      for (let j = 0; j < board[i].length; j++) {
        row += board[i][j] + ' ';
      }
      console.log(row);
    }
  }
  play() {
    if (this.validator() === false) return;
    this.countdownGame();
    let pos = this.startPositions;
    let [i, j] = pos;
    
    let board = this.generateBoard()
    console.log(board);
    for (i; i < this.height; i++) {
      for (j; j < this.width; j++) {
        this.clearScreen();
        this.point++;
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
        console.log(`Start in position i: ${pos[0]}; j: ${pos[1]}`);
        console.log(`Your point now:${this.point}`);
        board[i][j] = this.Symbol
        this.playBoard(board);
        this.sleep(1000);
        board[i][j] = '.'
      }
      j = 0
    }
    console.log('FINISH\n');
    let result = this.skippedPositions
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'o') {
          result.push([i, j])
        }
      }
    }
    console.log(`Posisi yang di lompati :\n`, result);
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
const args = process.argv.slice(2) 
const height = +args[0];
const width = +args[1];
let countdown = +args[2];
if(Number.isNaN(countdown)){
  countdown = undefined;
}
const game = new PacMan(height, width, countdown);
module.exports = PacMan

// File: fsjs-p1-v2-c1-tfnadr/pacManAdvance.js

"use strict"
let PacMan = require('./index')
class PacManAdvance extends PacMan {
  
  constructor(height, width, playedBy) {
    super(height, width, 4, '☻')
    this.playedBy = playedBy
    this.zonkPoint = 0
  }
  validator() {
    if (this.height < 4 || this.height % 2 === 1) {
      console.log(`wajib genap euyy...`);
      return false;
    }
    if (this.width < 4 || this.width % 2 === 1) {
      console.log(`harus genap boss...`);
      return false;
    }
    if (this.width !== this.height) {
      console.log(`harus sama`);
      return false;
    }
  }
  play() {
    if (this.validator() === false) return;
    this.countdownGame();
    let pos = this.startPositions;
    let [i, j] = pos;
    let board = this.generateBoard()
    let k = this.height / 2 - 1
    let l = this.width / 2 - 1
    board[k][l] = '.';
    board[k][l+1] = '.';
    board[k+1][l] = '.';
    board[k+1][l+1] = '.';
    console.log(board);
    
    for (i; i < this.height; i++) {
      for (j; j < this.width; j++) {
        this.clearScreen();
        if(board[i][j] === '.'){
          this.zonkPoint ++
        }else{
          this.point++
        }
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
        console.log(`Start in position i: ${pos[0]}; j: ${pos[1]}`);
        console.log(`Your point now:${this.point}`);
        console.log(`Your Zonk Point: ${this.zonkPoint}`);
        board[i][j] = this.Symbol
        this.playBoard(board);
        this.sleep(1000);
        board[i][j] = '.'
      }
      j = 0
    }
    console.log('FINISH\n');
    let result = this.skippedPositions
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'o') {
          result.push([i, j])
        }
      }
    }
    console.log(`Posisi yang di lompati :\n`, result);
  }
}
const args = process.argv.slice(2) 
const height = +args[0];
const width = +args[1];
const playedBy = args[2]
const pacManAdvance = new PacManAdvance(height, width, playedBy)  


// File: fsjs-p1-v2-c1-tfnadr/pacManSad.js

"use strict"
let PacMan = require('./index')
class PacManSad extends PacMan {
  
  constructor(height, width) {
   super(height, width, 4, '☹︎')
  }
  validator() {
    if (this.height < 3 || this.height % 2 === 0) {
      console.log(`wajib ganjil euyy...`);
      return false;
    }
    if (this.width < 3 || this.width % 2 === 0) {
      console.log(`harus ganjil boss...`);
      return false; 
    }
  }
}
const args = process.argv.slice(2) 
const height = +args[0];
const width = +args[1];
const pacManSad = new PacManSad(height, width)  


