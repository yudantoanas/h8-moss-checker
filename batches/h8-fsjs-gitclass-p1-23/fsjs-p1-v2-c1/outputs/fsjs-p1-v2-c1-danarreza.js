// File: fsjs-p1-v2-c1-danarreza/index.js

"use strict"
class PacMan {
  
  #skippedPositions;
  #startPosition
  constructor(height, width, countdown = 3, symbol = "☺︎") {
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.point = 0
    this.#skippedPositions = [];
    this.#startPosition = this.randomStartPosition();
    this.symbol = symbol;
  }
  
  validator() {
    if (this.height < 3) {
      console.log(`Input height minimum 3`);
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
  get skippedPositions() {
    return this.#skippedPositions
  }
  set skippedPositions(value) {
    return this.#skippedPositions
  }
  get startPosition() {
    return this.#startPosition
  }
  set startPosition(value) {
    return this.#startPosition
  }
  randomStartPosition() {
    let x = Math.floor(Math.random() * this.height);
    let y = Math.floor(Math.random() * this.width);
    let result = [x, y];
    return result;
  }
  countdownGame() {
    let count = this.countdown;
    while (count >= 0) {
      console.log(`COUNTDOWN: ${count}`);
      for (let x = 0; x < this.height; x++) {
        let row = '';
        for (let y = 0; y < this.width; y++) {
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
    for (let x = 0; x < this.height; x++) {
      let row = [];
      for (let y = 0; y < this.width; y++) {
        row.push('o')
      }
      result.push(row);
    }
    return result
  }
  skyBoard(board) {
    for (let x = 0; x < board.length; x++) {
      let row = '';
      for (let y = 0; y < board[x].length; y++) {
        row += board[x][y] + ' ';
      }
      console.log(row)
    }
  }
  play() {
    if (this.validator() === false) return;
    this.countdownGame();
    let skyPos = this.#startPosition;
    let [x, y] = skyPos;
    let board = this.generateBoard();
    let store = 0
    for (x; x < this.height; x++) {
      for (y; y < this.width; y++) {
        this.clearScreen();
        this.store++;
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
        console.log(`Start in position x: ${skyPos[0]}; y: ${skyPos[1]}`);
        console.log(`Your Point Now : ${store}`);
        board[x][y] = this.symbol;
        this.skyBoard(board);
        this.sleep(1000);
        board[x][y] = "."
      }
      y = 0;
    }
    console.log('FINISH');
    let result = this.#skippedPositions
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] === 'o') {
          result.push([x, y]);
        }
      }
    }
    console.log(`Final PacMan:\n`, result)
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
const data = process.argv.slice(2);
const height = data[0]
const width = data[1]
let countdown = data[2]
if (Number.isNaN(countdown)) {
  countdown = undefined
}
const game = new PacMan(height, width, countdown)  
console.log(game.skippedPositions)
console.log(game.startPosition)
module.exports = PacMan

// File: fsjs-p1-v2-c1-danarreza/pacManAdvance.js

"use strict"
let PacMan = require('./index')
class PacManAdvance extends PacMan {
  
  constructor(height, width, playedBy) {
    super(height, width, 5, "☻")
    this.zonkPoint = 0
    this.playedBy = playedBy
  }
  cekValidasi() { 
    if (this.height % 2 === 1 || this.height < 4) {
      console.log(`Input Minimal 4 BOSS!`);
      return false;
    }
    if (this.width % 2 === 1 || this.width < 4) {
      console.log(`Input Minimal 4 BOSS!`);
      return false;
    }
    if (this.height !== this.width) {
      console.log(`Height and Width must be equal`)
      return false
    }
  }
  play() {
    if (this.cekValidasi() === false) return;
    this.countdownGame();
    let skyPos = this.startPosition;
    let [x, y] = skyPos;
    let board = this.generateBoard();
    let a = (this.height / 2) - 1
    let b = (this.width / 2) - 1
    board[a][b] = "."
    board[a][b + 1] = "."
    board[a + 1][b] = "."
    board[a + 1][b + 1] = "."
    let store = 0
    for (x; x < this.height; x++) {
      for (y; y < this.width; y++) {
        this.clearScreen();
        store++;
        if (board[x][y] === '.') {
          this.zonkPoint++
        } else {
          this.point++
        }
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
        console.log(`Start in position is: ${skyPos[0]}; y: ${skyPos[1]}`);
        console.log(`Your Point Now : ${store}`);
        console.log(`Zonk Point ${this.zonkPoint}`)
        board[x][y] = this.symbol
        this.skyBoard(board)
        this.sleep(1000);
        board[x][y] = "."
      }
      y = 0;
    }
    console.log('FINISH');
    let result = this.skippedPositions
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        if (board[x][y] === 'o') {
          result.push([x, y]);
        }
      }
    }
    console.log(`Final PacMan:\n`, result)
    console.log(`Dimainkan oleh : ${this.playedBy}`);
  }
}
const data = process.argv.slice(2);
const height = +data[0]
const width = +data[1]
const playedBy = data[2]
let pacManAdvance = new PacManAdvance(height, width, playedBy)
pacManAdvance.play()

// File: fsjs-p1-v2-c1-danarreza/pacManSad.js

"use strict"
let PacMan = require('./index')
class PacManSad extends PacMan {
  
  #skippedPositions
  #startPositions
  constructor(height, width) {
    super(height, width, 4, "☹")
  }
  validator() {
    if (this.height < 3 || this.height % 2 === 0) {
      console.log(`Inputnya harus ganjil BOSS & Input Height minimum 3`);
      return false;
    }
    if (this.width < 3 || this.width % 2 === 0) {
      console.log(`Input width minimum 3!`);
      return false;
    }
  }
}
const data = process.argv.slice(2);
const height = data[0]
const width = data[1]
const pacManSad = new PacManSad(height, width)  
pacManSad.play()

