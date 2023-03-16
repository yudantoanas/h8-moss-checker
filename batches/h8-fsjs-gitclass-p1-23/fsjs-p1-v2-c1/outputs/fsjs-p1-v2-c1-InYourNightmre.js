// File: fsjs-p1-v2-c1-InYourNightmre/index.js

"use strict"
class PacMan {
  
  #skippedPositions;
  #startPosition;
  
  constructor(height, width, countdown = 3, symbol = "☺︎"){
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.#skippedPositions = [];
    this.#startPosition = this.randomStartPosition();
    this.symbol = symbol
  }
  get skippedPositions(){
    return this.#skippedPositions;
  }
  get startPosition(){
    return this.#startPosition;
  }
  
  set skippedPositions(value){
    this.#skippedPositions = value
  }
  
  set startPosition(value){
    this.#startPosition = value
  }
  
  cekValidasi() { 
    if (this.height < 3) {
      console.log(`Input height minimum 3!`);
      return false;
    }
    if (this.width < 3) {
      console.log(`Input width minimum 3!`);
      return false;
    }
    if (this.countdown < 0) {
      console.log(`Input countdown do not accept minus!`);
      return false;
    }
  }
  randomStartPosition() {
    let i = Math.floor(Math.random() * this.height);
    let j = Math.floor(Math.random() * this.width); 
    return [i, j];
  }
  countdownGame(){
    let count = this.countdown;
    while (count >= 0){
      this.clearScreen();
      console.log(`COUNTDOWN: ${count}`);
      for(let i = 0; i <this.height; i++){
        let row = "";
        for(let j = 0; j < this.width; j++){
          row+= `${count}`;
        }
        console.log(row);
      }
      this.sleep(1000);
      this.clearScreen();
      count--;
    }
  }
  generateBoard(){
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let row = [];
      for (let j = 0; j < this.width; j++) {
        row.push('o')
      }
      result.push(row);
    }
    return result
  }
  gameBoard(board) {
    for (let i = 0; i < board.length; i++) {
      let row = '';
      for (let j = 0; j < board[i].length; j++) {
        row += board[i][j] + ' ';
      }
      console.log(row)
    }
  }
  play(){
    if (this.cekValidasi() === false) return;
    this.countdownGame();
    let gamePos = this.#startPosition;
    let [i, j] = gamePos;
    let board = this.generateBoard();
    let store = 0
    for (i; i < this.height; i++) {
      for (j; j < this.width; j++) {
        this.clearScreen();
        store++;
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
        console.log(`Start in position x: ${gamePos[0]}; y: ${gamePos[1]}`);
        console.log(`Your Point Now : ${store}`);
        board[i][j] = this.symbol
        this.gameBoard(board);
        this.sleep(1000);
        board[i][j] = "."
      }
      j = 0;
    }
    console.log('FINISH');
    let result = this.#skippedPositions
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'o') {
          result.push([i, j]);
        }
      }
    }
    console.log(`Final PacMan:\n`, result)
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
const dsp = process.argv.slice(2);
const height = +dsp[0]
const width = +dsp[1]
let countdown = +dsp[2]
if (Number.isNaN(countdown)) {
  countdown = undefined  
}
const game = new PacMan(height, width, countdown)  
module.exports = PacMan


// File: fsjs-p1-v2-c1-InYourNightmre/pacManAdvance.js

"use strict"
let PacMan = require('./index')
const dsp = process.argv.slice(2);
const height = +dsp[0]
const width = +dsp[1]
let name = dsp[2]
class PacManAdvance extends PacMan {
  
  constructor(height, width, name){
  super(height,width,5, "☻")
  this.zonkPoint = 0
  this.playedBy = name
}
cekValidasi() { 
  if (this.height % 2 === 1 || this.height < 4) {
    console.log(`MINIMAL ITU 4 YA GAN SUENGGOL DONG!`);
    return false;
  }
  if (this.width % 2 === 1 || this.width < 4) {
    console.log(`MINIMAL ITU 4 YA GAN SUENGGOL DONG!`);
    return false;
  }
  if(this.height !== this.width){
    console.log(`Height and Width must be equal`)
    return false
  }
}
play(){
  if (this.cekValidasi() === false) return;
  this.countdownGame();
  let gamePos = this.startPosition;
  let [i, j] = gamePos;
  let board = this.generateBoard();
  let m = (this.height / 2) - 1
  let n = (this.width / 2) - 1
  board[m][n] = "."
  board[m][n + 1] = "."
  board[m + 1][n] = "."
  board[m + 1][n + 1] = "."
  console.log(board)
  let store = 0
  for (i; i < this.height; i++) {
    for (j; j < this.width; j++) {
      this.clearScreen();
      store++;
      if (board[i][j] === '.') {
        this.zonkPoint++
      }else{
        this.point++
      }
      console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
      console.log(`Start in position x: ${gamePos[0]}; y: ${gamePos[1]}`);
      console.log(`Your Point Now : ${store}`);
      console.log(`Zonk Point ${this.zonkPoint}`)
      board[i][j] = this.symbol
      this.gameBoard(board);
      this.sleep(1000);
      board[i][j] = "."
    }
    j = 0;
  }
  console.log('FINISH');
  let result = this.skippedPositions
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'o') {
        result.push([i, j]);
      }
    }
  }
  console.log(`Final PacMan:\n`, result)
  console.log(`Dimainkan oleh : ${name}`);
}
}
const pacManAdvance = new PacManAdvance(height, width, name)  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-InYourNightmre/pacManSad.js

"use strict"
let PacMan = require('./index')
const dsp = process.argv.slice(2);
const height = +dsp[0]
const width = +dsp[1]
let countdown = +dsp[2]
class PacManSad extends PacMan {
  
  
  
  constructor(height, width){
    super(height,width,4, "☹")
    
    
  }
  cekValidasi() { 
    if (this.height % 2 == 0 || this.height < 3) {
      console.log(`MINIMAL ITU 3 YA GAN!`);
      return false;
    }
    if (this.width % 2 == 0 || this.width < 3) {
      console.log(`MINIMAL ITU 3 YA GAN!`);
      return false;
    }
  }
}
const pacManSad = new PacManSad(height, width, countdown)  
pacManSad.play()

