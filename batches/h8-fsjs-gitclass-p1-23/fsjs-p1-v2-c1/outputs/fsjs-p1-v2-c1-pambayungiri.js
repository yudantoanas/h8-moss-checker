// File: fsjs-p1-v2-c1-pambayungiri/index.js

"use strict"
class PacMan {
  #skippedPositions
  #startPosition
  
  constructor(height, width, countdown = 3, symbol = '☺︎'){
    this.height = +height
    this.width = +width
    this.countdown = +countdown 
    this.points = 0
    this.#skippedPositions = []
    this.#startPosition = this.randomStartPosition()
    this.symbol = symbol
  }
  get skippedPositions(){
    return this.#skippedPositions
  }
  get startPosition(){
    return this.#startPosition
  }
  set skippedPositions(value){
    return this.#skippedPositions = value
  }
  set startPosition(value){
    return this.#startPosition = value
  }
  
  validation(){
    if (this.height < 3 || this.width < 3 || (this.countdown < 1 || !this.countdown)) {
      if (this.height < 3 ) {
        console.log('Input height minimum 3!');
      }
      if (this.width < 3) {
        console.log('Input width minimum 3!');
      } 
      if (this.countdown < 1 || !this.countdown){
        console.log("Input countdown do not accept minus!");
      } 
      return false;
    } else {
      return true
    }
  }
  randomStartPosition(){
    let randomHeight = Math.floor(Math.random()*this.height)
    let randomWidth = Math.floor(Math.random()*this.width)
    return [randomHeight, randomWidth]
  }
  countdownGame(){
    for (let i = this.countdown; i >= 0; i--) {
      console.log(`COUNTDOWN : ${i}`);
      for (const perSecond of this.generateBoard(i)) {
        console.log(perSecond.join(" "));
      }  
      this.sleep(1000)
      this.clearScreen()
    }
  }
  generateBoard(value = "o"){
    let result = []
    for (let i = 0; i < this.height; i++) {
      let temp = []
      for (let j = 0; j < this.width; j++) {
        temp.push(value)
      }
      result.push(temp)
    }
    return result
  }
  play(){
    if (this.validation()) {
      this.countdownGame()
      let board = this.generateBoard()
      let flag = false
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (i === this.#startPosition[0] && j === this.#startPosition[1]) {
            flag = true
          }
          if (flag) {
            this.clearScreen()
            console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
            console.log(`Start in position i: ${this.#startPosition[0]}; j: ${this.#startPosition[1]}`);
            console.log(`Your point now : ${this.points += 1}`);
            board[i][j] = this.symbol
            for (const perSecond of board) {
              console.log(perSecond.join(" "));
            }  
            
            this.sleep(1000)
            board[i][j] = "."
          } else {
            this.#skippedPositions.push([i,j])
          }
        }
      }
      console.log("FINISH");
      console.log("\nPosisi yang di lompati :");
      console.log(this.#skippedPositions);
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
module.exports = PacMan

// File: fsjs-p1-v2-c1-pambayungiri/pacManAdvance.js

"use strict"
let PacMan = require("./index")
class PacManAdvance extends PacMan {
  constructor (height, width, name = ""){
    super(height,width,5,"☻")
    this.playedBy = name
    this.zonkPoints = 0
  }
  validation(){
    if (this.height < 4 || this.width < 4 || this.height % 2 !== 0 || this.width % 2 !== 0) {
      if (this.height < 4 || this.height % 2 !== 0 ) {
        console.log('Input height minimum 4 dan angka genap!');
      }
      if (this.width < 4 || this.width % 2 !== 0) {
        console.log('Input width minimum 4 dan angka genap!');
      } 
      return false;
    } else {
      return true
    }
  }
  generateBoardZonk(){
    let board = super.generateBoard()
    let i = board.length / 2
    board[i][i] = "."
    board[i][i - 1] = "."
    board[i - 1][i] = "."
    board[i - 1][i - 1] = "."
    return board
  }
  play(){
    if (this.validation()) {
      this.countdownGame()
      let board = this.generateBoardZonk()
      let flag = false
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (i === this.startPosition[0] && j === this.startPosition[1]) {
            flag = true
          }
          if (flag) {
            this.clearScreen()
            if (board[i][j] !== ".") {
              this.points++
            } else {
              this.zonkPoints++
            }
            console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
            console.log(`Start in position i: ${this.startPosition[0]}; j: ${this.startPosition[1]}`);
            console.log(`Your point now : ${this.points}`);
            console.log(`Your zonk point now : ${this.zonkPoints}`);
            board[i][j] = this.symbol
            for (const perSecond of board) {
              console.log(perSecond.join(" "));
            }  
            this.sleep(1000)
            board[i][j] = "."
          } else {
            if (board[i][j] !== ".") {
              this.skippedPositions.push([i,j])
            } 
          }
        }
      }
      console.log("FINISH");
      console.log("\nPosisi yang di lompati :");
      console.log(this.skippedPositions);
      console.log(`Dimainkan oleh ${this.playedBy}`);
    }
  }
}
let [height, width, name] = process.argv.slice(2)
const pacManAdvance = new PacManAdvance(height, width, name)  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-pambayungiri/pacManSad.js

"use strict"
let PacMan = require("./index")
class PacManSad extends PacMan {
  constructor (height, width){
    super(height,width, 4 , "☹︎")
  }
  validation(){
    if (this.height < 3 || this.width < 3 || this.height % 2 === 0 || this.width % 2 === 0) {
      if (this.height < 3 || this.height % 2 === 0 ) {
        console.log('Input height minimum 3 dan angka ganjil!');
      }
      if (this.width < 3 || this.width % 2 === 0) {
        console.log('Input width minimum 3 dan angka ganjil!');
      } 
      return false;
    } else {
      return true
    }
  }
}
let [height, width] = process.argv.slice(2)
const pacManSad = new PacManSad(height, width)  
pacManSad.play()

