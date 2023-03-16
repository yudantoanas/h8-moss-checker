// File: fsjs-p1-v2-c1-hapsariayu/index.js

"use strict"
class PacMan {
  
  #skippedPositions
  #startPosition
  constructor(height, width, countdown = 3, symbol = '☺︎') {
    
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
    return this.#skippedPositions = value
  }
  get startPosition() {
    return this.#startPosition
  }
  
  validationGate() {
    if (this.height < 3) {
      console.log(`Input height minimum 3!`);
      
      return false
    }
    if (this.width < 3) {
      console.log(`Input width minimum 3!`);
      
      return false
    }
    if (this.countdown < 0) {
      console.log(`Input countdown do not accept minus!`);
      
      return false
    }
    return true
  }
  randomStartPosition() {
    let row = 0;
    let col = 0;
    row = Math.floor(Math.random() * this.height)
    col = Math.floor(Math.random() * this.width)
    this.#startPosition = [row, col];
    
    return [row, col]
  }
  countdownGame() {
    let counter = 0;
    for (let i = 0; i < this.countdown + 1; i++) {
      this.clearScreen();
      console.log(`COUNTDOWN : ${this.countdown - counter}`);
     
      for(let j = 0; j < this.height; j++){
        let display = '';
        for(let k = 0; k < this.width; k++){
          display += `${this.countdown - counter} `
        }
        console.log(display);
      }
      this.sleep(1000);
      counter++
    }
    this.clearScreen()
  }
  generateBoard(str, currentPosition = [-1, -1]) {
    let boardGame = []
    for (let i = 0; i < this.height; i++) {
      let temp = [];
      for (let j = 0; j < this.width; j++) {
        if (this.#skippedPositions.find(el => el[0] === i && el[1] === j)) {
          temp.push(str)
        } else if (i === currentPosition[0] && j === currentPosition[1]) {
          temp.push(this.symbol)
        } else if (i < currentPosition[0]) {
          temp.push(`.`)
        } else if (i === currentPosition[0] && j <= currentPosition[1]) {
          temp.push('.')
        } else {
          temp.push(str)
        }
      }
      boardGame.push(temp)
    }
    return boardGame
  }
  play() {
    let validating = this.validationGate(this.height, this.width, this.countdown)
    if(!validating) return ''
    this.countdownGame()
    let currentPosition = [this.#startPosition[0], this.#startPosition[1]]
    for (let i = 0; i <= currentPosition[0]; i++) {
      for (let j = 0; j < this.width; j++) {
        if (i === currentPosition[0]) {
          if (j < currentPosition[1]) {
            this.#skippedPositions.push([i, j])
          }
        } else {
          this.#skippedPositions.push([i, j])
        }
      }
    }
    while (true) {
      this.clearScreen()
      console.log(`PLAY BOARD SIZE : ${this.height} x ${this.width}`);
      console.log(`Start in position j: ${this.#startPosition[1]}; i: ${this.#startPosition[0]}`);
      console.log(`Your point now: ${this.points}`);
      let board = this.generateBoard('o', currentPosition)
      board.forEach(el => {
        console.log(el.join(' '));
      });
      
      if (currentPosition[1] < this.width - 1) {
        currentPosition[1]++
      } else {
        currentPosition[0]++
        currentPosition[1] = 0
      }
      this.points++
      this.sleep(1000)
      if (currentPosition[0] === this.height) {
        this.clearScreen()
        console.log(`PLAY BOARD SIZE : ${this.height} x ${this.width}`);
        console.log(`Start in position j: ${this.#startPosition[1]}; i: ${this.#startPosition[0]}`);
        console.log(`Your point now: ${this.points}`);
        board.forEach(el => {
          console.log(el.join(' '));
        });
        console.log('FINISH \n');
        console.log('Posisi yang dilompati : ');
        console.log(this.#skippedPositions);
        this.sleep(1000)
        break;
      }
    }
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
const Input = process.argv.slice(2)
let height = +Input[0];
let width = +Input[1];
let countdown = +Input[2];
if (Number.isNaN(countdown)) {
  countdown = undefined
}
module.exports = PacMan

// File: fsjs-p1-v2-c1-hapsariayu/pacManAdvance.js

"use strict"
const PacMan = require('./index')
class PacManAdvance extends PacMan {
  
  constructor(height, width, name) {
    super(height, width, 5, '☻')
    this.playedBy = name
    this.zonkPoints = 0;
  }
  validationGate() {
    if (this.height < 4 && this.height % 2 === 1) {
      console.log(`Input height minimum 3!`);
      return false
    }
    if (this.width < 4 && this.width % 2 === 1) {
      console.log(`Input width minimum 3!`);
      return false
    }
    return true
  }
  generateBoard(str, currentPosition = [-1, -1]) {
    let boardGame = []
    let zonk = [
      [(this.height / 2), (this.width / 2)],
      [(this.height / 2), (this.width / 2) - 1],
      [(this.height / 2) - 1, this.width / 2],
      [(this.height / 2) - 1, (this.width / 2) - 1],
    ]
    for (let i = 0; i < this.height; i++) {
      let temp = [];
      for (let j = 0; j < this.width; j++) {
        if (zonk.find(el => el[0] === i && el[1] === j)) {
          temp.push(`.`)
        } else if (this.skippedPositions.find(el => el[0] === i && el[1] === j) ) {
          temp.push(str)
        } else if (i < currentPosition[0]) {
          temp.push(`.`)
        } else if (i === currentPosition[0] && j < currentPosition[1]) {
          temp.push('.')
        } else {
          temp.push(str)
        }
      }
      boardGame.push(temp)
    }
    return boardGame
  }
  play() {
    let validating = this.validationGate(this.height, this.width, this.countdown)
    if (!validating) return ''
    this.countdownGame()
    let currentPosition = [this.startPosition[0], this.startPosition[1]]
    for (let i = 0; i <= currentPosition[0]; i++) {
      for (let j = 0; j < this.width; j++) {
        if (i === currentPosition[0]) {
          if (j < currentPosition[1]) {
            this.skippedPositions.push([i, j])
          }
        } else {
          this.skippedPositions.push([i, j])
        }
      }
    }
    while (true) {
      this.clearScreen()
      console.log(`PLAY BOARD SIZE : ${this.height} x ${this.width}`);
      console.log(`Start in position j: ${this.startPosition[1]}; i: ${this.startPosition[0]}`);
      console.log(`Your point now: ${this.points}`);
      console.log(`Your zonk point now: ${this.zonkPoints}`);
      let board = this.generateBoard('o', currentPosition)
      console.log(board[currentPosition[0]][currentPosition[1]]);
      console.log(currentPosition);
      if (board[currentPosition[0]] && board[currentPosition[0]][currentPosition[1]] === 'o') {
        this.points++
      } else if (board[currentPosition[0]] && board[currentPosition[0]][currentPosition[1]] === '.') {
        this.zonkPoints++
      }
      board[currentPosition[0]][currentPosition[1]] = this.symbol
      board.forEach(el => {
        console.log(el.join(' '));
      });
      this.sleep(1000)
      
      if (currentPosition[1] < this.width - 1) {
        currentPosition[1]++
      } else {
        currentPosition[0]++
        currentPosition[1] = 0
      }
      
      if (currentPosition[0] === this.height) {
        this.clearScreen()
        console.log(`PLAY BOARD SIZE : ${this.height} x ${this.width}`);
        console.log(`Start in position j: ${this.startPosition[1]}; i: ${this.startPosition[0]}`);
        console.log(`Your point now: ${this.points}`);
        console.log(`Your zonk point now: ${this.zonkPoints}`);
        board.forEach(el => {
          console.log(el.join(' '));
        });
        console.log('FINISH \n');
        console.log('Posisi yang dilompati : ');
        console.log(this.skippedPositions);
        console.log(`Dimainkan oleh ${this.playedBy}`);
        this.sleep(1000)
        break;
      }
    }
  }
}
let input = process.argv.slice(2)
let height = +input[0];
let width = +input[1];
let name = input[2]
const pacManAdvance = new PacManAdvance(height, width, name)  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-hapsariayu/pacManSad.js

"use strict"
const PacMan = require('./index')
class PacManSad extends PacMan {
  
  constructor(height, width) {
    super(height, width, 4, '☹︎')
  }
  validationGate() {
    if (this.height < 3 && this.height % 2 === 0) {
      console.log(`Input height minimum 3!`);
      return false
    }
    if (this.width < 3 && this.width % 2 === 0) {
      console.log(`Input width minimum 3!`);
      return false
    }
    return true
  }
}
let input = process.argv.slice(2)
let height = +input[0];
let width = +input[1];
const pacManSad = new PacManSad(height, width)  
pacManSad.play()

