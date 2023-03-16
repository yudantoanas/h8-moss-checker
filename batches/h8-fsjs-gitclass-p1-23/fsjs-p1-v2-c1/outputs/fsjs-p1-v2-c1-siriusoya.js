// File: fsjs-p1-v2-c1-siriusoya/index.js

"use strict"
class PacMan {
  
  #skippedPositions
  #startPosition
  constructor(height, width, countdown = 3, symbol){
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.symbol = '☺︎';
    this.points = 0;
    this.#skippedPositions = [];
    this.#startPosition = this.randomStartPosition();
  }
  
  validation(){
    if (this.height < 3) {
      console.log('Input height minimum 3');
      return false;
    }
    if (this.width < 3) {
      console.log('Input height minimum 3');
      return false;
    }
    if (this.countdown < 1) {
      console.log('Input countdown minimum 1');
      return false;
    }
    return true;
  }
  randomStartPosition(){
    let result = [];
    result.push(Math.floor(Math.random() * (this.height)));
    result.push(Math.floor(Math.random() * (this.width)));
    return result;
  }
  countdownGame(){
    for (let i = this.countdown; i >= 0; i--) {
      console.log(`COUNTDOWN : ${i}`);
      for (let j = 0; j < this.height; j++) {
        let temp = '';
        for (let k = 0; k < this.width; k++) {
          temp += `${i} `;
        }
        console.log(temp);
      }
      this.sleep(1000);
      this.clearScreen();
    }
  }
  generateBoard(){
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let temp = [];
      for (let j = 0; j < this.width; j++) {
        temp.push('o');
      }
      result.push(temp);
    }
    return result;
  }
  play(){
    if (this.validation() === false) {
      return;
    } else {
      this.countdownGame();
      let begin = this.#startPosition;
      let board = this.generateBoard();
      let flag = false;
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (i === begin[0] && j === begin[1]) {
            flag = true;
          }
          if (flag) {
            this.clearScreen();
            this.points++;
            console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
            console.log(`Your point now : ${this.points}`);
            board[i][j] = this.symbol;
            console.log(board.map(temp => temp.join(' ')).join('\n'));
            this.sleep(1000);
            board[i][j] = '.';
          } else {
            this.skippedPositions.push([i, j]);
          }
        }
      }
      console.log('FINISH')
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
  get skippedPositions(){
    return this.#skippedPositions;
  }
  set skippedPositions(value){
    this.#skippedPositions = value;
  }
  get startPosition(){
    return this.#startPosition;
  }
  set startPosition(value){
    this.#startPosition = value;
  }
}
const process = require('process');
const args = process.argv.slice(2);
const example1 = new PacMan(4, 5)
const example2 = new PacMan(4, 5, 3)
const game = new PacMan(args[0], args[1], args[2]);  
let randomPos = game.randomStartPosition() 
game.play()
module.exports = PacMan;

// File: fsjs-p1-v2-c1-siriusoya/pacManAdvance.js

"use strict"
let PacMan = require('./index');
class PacManAdvance extends PacMan {
  
  constructor(height, width) {
    super(height, width, 5, '☻')
  }
  validation() {
    if (this.height !== this.width) {
      console.log('Tinggi dan lebar board harus sama');
      return;
    }
    if (this.height % 2 !== 0 || this.width % 2 !== 0) {
      console.log('Tinggi dan lebar board harus genap');
      return;
    }
  }
}
const pacManAdvance = new PacManAdvance()  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-siriusoya/pacManSad.js

"use strict"
let PacMan = require('./index');
class PacManSad extends PacMan {
  
  constructor(height, width) {
    super(height, width, 4, '☹︎')
  }
  validation() {
    if (this.height % 2 === 0 || this.width % 2 === 0) {
      console.log('Tinggi dan lebar board harus ganjil');
      return;
    }
    if (this.height < 3 || this.width < 3) {
      console.log('Tinggi dan lebar board harus minimal 3');
      return;
    }
  }
}
const pacManSad = new PacManSad()  
pacManSad.play()

