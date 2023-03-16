// File: fsjs-p1-v2-c1-SgtRyu1/index.js

"use strict"
class PacMan {
  
  #skippedPosition;
  #startPosition;
  constructor(height, width, countdown = 3, symbol = '☺︎') {
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.point = 0;
    this.#skippedPosition = [];
    this.#startPosition = this.randomStartPosition();
    this.symbol = symbol;
  }
  get skippedPosition(){
    return this.#skippedPosition;
  }
  set skippedPosition(value){
    this.#skippedPosition = value;
  }
  get startPosition(){
    return this.#startPosition;
  }
  set startPosition(value){
    this.#startPosition = value;
  }
  
  validateInput() {
    if (this.height < 3) {
      console.log(
        "Input tidak valid! Minimal height adalah 3"
      );
      return false;
    }
    else
    if(this.width < 3){
      console.log(
        "Input tidak valid! Minimal width adalah 3"
      );
      return false;
    }
    else
    if(this.countdown < 1){
      console.log(
        "Input tidak valid! Minimal countdown adalah 1."
      );
      return false;
    }
    return true;
  }
  randomStartPosition(){
    let row = Math.floor(Math.random() * this.height); 
    let col = Math.floor(Math.random() * this.width); 
    return [row, col]; 
  }
  countdownGame(){
    const countdownDuration = this.countdown; 
    for (let i = countdownDuration; i >= 0; i--) {
      console.clear();
      console.log(`Game will start in ${i} second${i > 1 ? 's' : ''}...`);
      let boardCountdown = this.generateBoard(i);
      boardCountdown.forEach(element => {
        console.log(element.join(' '));
      });
      this.sleep(1000); 
    }
    console.clear();
    console.log('Game started!');
  }
  generateBoard(value) {
    const board = [];
    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        row.push(value);
      }
      board.push(row);
    }
    return board;
  }
  replacementBoard(value){
    for (let i = 0 ; i < this.height; i++) {
      let flag = "";
      for (let j = 0; j < this.width; j++) {
        flag += (value[i][j] + " ")
      } 
      console.log(flag);
    }
  }
  play(){
    if (!this.validateInput()){
      return `Tolong input yang valid!`;
    } 
    
    
    this.countdownGame();
    
    let points = 0;
    
    let boardGame = this.generateBoard('o');
    let startColumn = this.startPosition[1];
    for(let i = this.startPosition[0] ; i < boardGame.length ; i++){
      for(let j = startColumn ; j < boardGame[i].length ; j++){
        boardGame[i][j] = this.symbol;
        points++;
        console.log(`Ukuran Board: ${this.width} x ${this.height}`);
        console.log(`Start Position i: ${this.startPosition[0]}; j: ${startColumn}`)
        console.log(`Points: ${points}`);
        this.replacementBoard(boardGame)
        this.sleep(1000);
        this.clearScreen();
        boardGame[i][j] = '.';
        startColumn = 0;
      }
    } 
    for (let i = 0; i < boardGame.length; i++) {
      for (let j = 0; j < boardGame[i].length; j++) {
        if(boardGame[i][j] === "o"){
          this.#skippedPosition.push([i, j]);
        }
      } 
    }
    console.log(`Finish`);
    console.log(`Posisi yang dilompati`);
    console.log(this.skippedPosition);
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
const [height, width, countdown] = process.argv.slice(2);
const game = new PacMan(+height, +width, +countdown)  
module.exports = PacMan;

// File: fsjs-p1-v2-c1-SgtRyu1/pacManAdvance.js

"use strict"
let PacMan = require('./index')
class PacManAdvance extends PacMan{
  
  constructor(height, width, countdown = 5, playedBy){
    super(height,width, countdown, '☻')
    this.playedBy = playedBy;
    this.zonkPoints = 0;
  }
  validateInput() {
    if (this.height < 4 || this.width < 4) {
      console.log('Height dan Width minimal 4!');
      return false;
    }
    if (this.height % 2 !== 0 || this.width % 2 !== 0) {
      console.log('Height dan Width harus angka genap!');
      return false;
    }
    if(this.countdown < 1){
      console.log(
        "Input tidak valid! Minimal countdown adalah 1."
      );
      return false;
    }
    if(this.height !== this.width){
      console.log('Height dan Width harus sama!');
      return false;
    }
    return true;
  }
  play(){
    if (!this.validateInput()){
      return `Tolong input yang valid!`;
    } 
  
    
    this.countdownGame();
    
    let points = 0;
    const middleRow = Math.floor(this.height / 2);
    const middleCol = Math.floor(this.width / 2);
    let boardGame = this.generateBoard('o');
    boardGame[middleRow][middleCol] = '.'
    boardGame[middleRow][middleCol-1] = '.'
    boardGame[middleRow-1][middleCol] = '.'
    boardGame[middleRow-1][middleCol-1] = '.'
    let startColumn = this.startPosition[1];
    for(let i = this.startPosition[0] ; i < boardGame.length ; i++){
      for(let j = startColumn ; j < boardGame[i].length ; j++){
        if(boardGame[i][j] === '.'){
          this.zonkPoints++;
        }
        else
        {
          points++;
        }
        boardGame[i][j] = this.symbol;
        
        console.log(`Ukuran Board: ${this.width} x ${this.height}`);
        console.log(`Start Position i: ${this.startPosition[0]}; j: ${startColumn}`)
        console.log(`Points: ${points}`);
        console.log(`ZonkPoints: ${this.zonkPoints}`);
        this.replacementBoard(boardGame)
        this.sleep(1000);
        this.clearScreen();
        boardGame[i][j] = '.';
        startColumn = 0;
      }
    } 
    for (let i = 0; i < boardGame.length; i++) {
      for (let j = 0; j < boardGame[i].length; j++) {
        if(boardGame[i][j] === "o"){
          this.skippedPosition.push([i, j]);
        }
      } 
    }
    console.log(`Finish`);
    console.log(`Posisi yang dilompati`);
    console.log(this.skippedPosition);
    console.log(`Dimainkan oleh ${this.playedBy}`)
  }
  
}
let height = +process.argv[2];
let width = +process.argv[3];
let countdown = +process.argv[4] || 5;
let playedBy = process.argv[5];
const pacManAdvance = new PacManAdvance(height, width, countdown,  playedBy)  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-SgtRyu1/pacManSad.js

"use strict"
let PacMan = require('./index')
class PacManSad extends PacMan{
  
  constructor(height, width, countdown = 4){
    super(height, width, countdown, '☹︎')
  }
  validateInput() {
    if (this.height < 3 || this.width < 3) {
      console.log('Height dan Width minimal 3!');
      return false;
    } else if (this.height % 2 === 0 || this.width % 2 === 0) {
      console.log('Height dan Width harus angka ganjil!');
      return false;
    } else if (this.countdown < 1) { 
      console.log('Countdown harus lebih besar atau sama dengan 1!');
      return false;
    }
    return true;
  }
}
let height = +process.argv[2];
let width = +process.argv[3];
let countdown = +process.argv[4] || 4;
const pacManSad = new PacManSad(height, width, countdown)  
pacManSad.play();

