// File: fsjs-p1-v2-c1-vermaklepis/index.js

"use strict"
class PacMan {
  
  #skippedPositions;
  #startPosition;
  constructor(height, width, countdown = 3, symbol= "☺︎") {
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.points = 0;
    this.#skippedPositions = [];
    this.#startPosition = this.randomStartPosition();
    this.symbol = symbol;
  }
  get skippedPositions() {
    return this.#skippedPositions
  }
  set skippedPositions(value) {
    this.#skippedPositions = value
  }
  get startPosition() {
    return this.#startPosition
  }
  set startPosition(value) {
    this.#startPosition = value
  }
  
  randomStartPosition() {
    let result = [];
    const randomRow = Math.floor(Math.random() * (this.height))
    const randomHeight = Math.floor(Math.random() * (this.width));
    result.push(randomRow, randomHeight);
    return result
  }
  checkInput() {
    let okay = true;
    if (this.height < 3) {
      console.log("Input height minimum 3!");
      okay = false;
    }
    if (this.width < 3) {
      console.log("Input width minimum 3!");
      okay = false;
    }
    if (this.countdown < 1) {
      console.log("Input countdown do not accept minus!");
      okay = false;
    }
    return okay;
  }
  boardPrinter(board) {
    for (let i = 0; i < this.height; i++) {
      let temp = "";
      for (let j = 0; j < this.width; j++) {
        temp += (board[i][j] + " ");
      }
      console.log(temp);
    }
  }
  generateBoard(character = "o") {
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let temp = [];
      for (let j = 0; j < this.width; j++) {
        temp.push(character);
      }
      result.push(temp);
    }
    
    return result;
  }
  countdownGame() {
    for (let i = this.countdown; i >= 0; i--) {
      console.log(`Countdown : ${i}`);
      for (let j = 0; j < this.height; j++) {
        let temp = "";
        for (let k = 0; k < this.width; k++) {
          temp += `${i}`
        }
        console.log(temp);
      }
      this.sleep(750);
      this.clearScreen();
    }
  }
  play() {
    if (this.checkInput() == false) {
      return
    }
    this.countdownGame()
    let board = this.generateBoard()
    let point = 0
    let columnStart = this.#startPosition[1];
    for (let i = this.#startPosition[0]; i < board.length; i++) {
      for (let j = this.#startPosition[1]; j < board[i].length; j++) {
        board[i][j] = this.symbol
        point++
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
        console.log(`Start in position i: ${this.#startPosition[0]} j: ${columnStart}`);
        console.log(`Your point is now : ${point}`);
        this.boardPrinter(board)
        this.sleep(750);
        this.clearScreen();
        board[i][j] = '.'
        this.#startPosition[1] = 0;
      }
    }
    let result = [];
    for (let i = 0; i < board.length; i++){
      for (let j = 0; j < board[i].length; j++){
        if (board[i][j] === "o"){
          result.push([i,j])
        }
      }
    }
    console.log(`FINISH`);
    console.log(`Posisi yang dilompati : `);
    console.log(result);
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
const example1 = new PacMan(4, 5)
const example2 = new PacMan(4, 5, 6)
const [height, width, countdown] = process.argv.slice(2);
const game = new PacMan(height, width, countdown)  
let randomPos = game.randomStartPosition()
module.exports = PacMan

// File: fsjs-p1-v2-c1-vermaklepis/pacManAdvance.js

"use strict"
let PacMan = require("./index");
class PacManAdvance extends PacMan {
  
  constructor(height, width,playedBy = 'teddybear') {
    super(height, width, 5, "☻");
    this.playedBy = playedBy
    this.zonkPoints = 0
  }
  checkInput() {
    if (this.height < 4) {
      console.log('Input height minimum 4!')
      return false
    } else if (this.width < 4) {
      console.log('Input width minimum 4!');
      return false
    } else if (this.countdown < 1 ) {
      console.log('Input countdown do not accept minus');
      return false
    }else if (this.height % 2 !== 0 || this.width % 2 !== 0) {
      console.log('Height and Width must be an even number');
      return false; 
    }else if (this.height !== this.width){
      console.log('Height and Width must be equal!');
      return false
    }
    return true
  }
  generateBoard() {
    let result = [];
      const xAxis = Math.floor(this.height/2 );
      const yAxis = Math.floor(this.width/2 );
    for (let i = 0; i < this.width; i++) {
      let innerArray = [];
      for (let j = 0; j < this.height; j++) {
        if ((i === yAxis || i === yAxis - 1) && (j === xAxis || j === xAxis - 1)) {
          innerArray.push('.');
          } else {
          innerArray.push('o');
        }
      }
      result.push(innerArray);
    }
    return result;
  }
  play(){
    if (this.checkInput() == false) {
      return
    }
    this.countdownGame()
    let board = this.generateBoard()
    let startJ = this.startPosition[1]
    for ( let i = this.startPosition[0] ; i < board.length ; i ++){
      for ( let j = this.startPosition[1] ; j < board[i].length ; j ++){
        if(board[i][j] == '.'){
          this.zonkPoints++
        }else{
          this.points++
        }
        board[i][j] = this.symbol
        this.clearScreen()
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`)
        console.log(`Start in position i: ${this.startPosition[0]} ; j: ${startJ}` )
        console.log(`Your point now : ${this.points}` )
        console.log(`Your Zonk Point now : ${this.zonkPoints}` )
        this.boardPrinter(board)
        
        
        board[i][j] = '.'
        this.startPosition[1] = 0  
        this.sleep(750)
      }           
    }
    for (let i = 0; i < board.length; i++){
      for (let j = 0; j < board[i].length; j++){
        if (board[i][j] === "o"){
          this.skippedPositions.push([i,j])
        }
      }
    }
    console.log(`FINISH`)  
    console.log(`Posisi Yang dilompati :`)
    console.log(this.skippedPositions);
  }
}
const [height, width, countdown] = process.argv.slice(2);
const pacManAdvance = new PacManAdvance(height, width, countdown)  
pacManAdvance.play()


// File: fsjs-p1-v2-c1-vermaklepis/pacManSad.js

"use strict"
let PacMan = require("./index");
class PacManSad extends PacMan{
  
  constructor(height, width) {
    super(height, width, 4, "☹︎");
  }
  checkInput() {
    if (this.height < 3) {
      console.log('Input height minimum 3!')
      return false
    } else if (this.width < 3) {
      console.log('Input width minimum 3!');
      return false
    } else if (this.countdown < 1 ) {
      console.log('Input countdown do not accept minus');
      return false
    }else if (this.height % 2 === 0 || this.width % 2 === 0) {
      console.log('Height and Width must be an odd number');
      return false; 
    }
    return true
  }
}
const [height, width, countdown] = process.argv.slice(2)
const pacManSad = new PacManSad(height, width, countdown) 
pacManSad.play()
pacManSad.checkInput()


