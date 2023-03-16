// File: fsjs-p1-v2-c1-Barif7/index.js

"use strict"
let input = process.argv.slice(2)
let height = Number(input[0]);
let width = Number(input[1]);
let countdown = input[2];
class PacMan {
  
  #skippedPositions
  #startPosition
  constructor(height, width, countdown = 3, symbol = '☺︎') {
    this.height = height,
      this.width = width,
      this.countdown = countdown,
      this.points = 0,
      this.#skippedPositions = [],
      this.#startPosition = this.randomStartPosition(),
      this.symbol = symbol
  }
  get skippedPositions() {
    return this.#skippedPositions
  }
  set skippedPositions(arr) {
    this.#skippedPositions = arr
  }
  get startPosition() {
    return this.#startPosition
  }
  set startPosition(arr) {
    this.#startPosition = arr
  }
  randomStartPosition() {
    let result = [];
    let row = Math.floor(Math.random() * this.height);
    let col = Math.floor(Math.random() * this.width)
    result.push(row, col)
    return result
  }
  checkValidate() {
    if (this.height < 3) {
      console.log(`Input height minimum 3`);
      return false;
    }
    if (this.width < 3) {
      console.log(`Input width minimum 3`);
      return false;
    }
    if (this.countdown < 1 || this.countdown.length === 0) {
      console.log(`Input countdown do not accept minus`)
      return false;
    }
    else {
      return true
    }
  }
  countdownGame() {
    for (let i = this.countdown; i >= 0; i--) {
      console.log(`COUNTDOWN : ${i}`)
      for (let j = 0; j < this.height; j++) {
        let perItemDisplayed = `${i}`;
        for (let k = 0; k < this.width - 1; k++) {
          perItemDisplayed += ` ${i}`;
        }
        console.log(perItemDisplayed)
      }
      this.sleep(1000);
      this.clearScreen();
    }
  }
  generateBoard() {
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let perRowTemp = [];
      for (let j = 0; j < this.width; j++) {
        perRowTemp.push('o')
      }
      result.push(perRowTemp);
    }
    
    return result;
  }
  play() {
    if (!this.checkValidate()) {
      return
    }
    else {
      this.countdownGame()
      console.log(`COUNTDOWN : ${this.countdown}`)
      console.log(`PLAY BOARD SIZE ${this.height} X ${this.width}`)
      console.log(`Start in position i: ${this.#startPosition[0]}; j: ${this.#startPosition[1]}`)
      console.log(`Your point now : ${this.points}`)
      const board = this.generateBoard()
      board.forEach(el => {
        console.log(el.join(" "))
      })
      this.sleep(700)
      this.clearScreen()
      this.points = 1
      let newData = this.startPosition[1]
      for (let i = this.startPosition[0]; i < board.length; i++) {
        for (let j = newData; j < board[i].length; j++) {
          board[i][j] = "☺︎"
          console.log(`PLAY BOARD SIZE ${this.height} X ${this.width}`)
          console.log(`Start in position i: ${this.startPosition[0]}; j: ${this.startPosition[1]}`)
          console.log(`Your point now : ${this.points}`)
          this.points++
          board.forEach(el => {
            console.log(el.join(" "))
          })
          this.sleep(700)
          this.clearScreen()
          board[i][j] = "."
          newData = 0
        }
      }
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === 'o') {
            this.skippedPositions.push([i, j])
          }
        }
      }
      console.log('FINISH')
      console.log(`Posisi yang di lompati :`)
      console.log(this.skippedPositions)
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
const game = new PacMan(height, width, countdown)  
module.exports = PacMan

// File: fsjs-p1-v2-c1-Barif7/pacManAdvance.js

"use strict"
const PacMan = require('./index')
let input = process.argv.slice(2)
let height = Number(input[0]);
let width = Number(input[1]);
let name = (input[2]);
class PacManAdvance extends PacMan {
  
  constructor(height, width, playedBy) {
    super(height, width, 5, '☻')
    this.playedBy = playedBy,
      this.zonkPoints = 0
  }
  checkValidate() {
    
    if (this.height < 4 || this.width < 4) {
      console.log(`Input height or width minimum 4`);
      return false;
    }
    if (this.height % 2 === 1 || this.width % 2 === 1) {
      console.log(`Input height or width must be an even number`);
      return false;
    }
    if (this.countdown < 1 || this.countdown.length === 0) {
      console.log(`Input countdown do not accept minus`)
      return false;
    }
    return true;
  }
  generateBoard() {
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let perRowTemp = [];
      for (let j = 0; j < this.width; j++) {
        perRowTemp.push('o')
      }
      result.push(perRowTemp);
    }
    const middleRow = Math.floor(this.height / 2);
    const middleCol = Math.floor(this.width / 2);
    result[middleRow][middleCol] = '.'
    result[middleRow][middleCol - 1] = '.'
    result[middleRow - 1][middleCol] = '.'
    result[middleRow - 1][middleCol - 1] = '.'
    
    return result;
  }
  play() {
    if (!this.checkValidate()) {
      return
    }
    else {
      this.countdownGame()
      console.log(`COUNTDOWN : ${this.countdown}`)
      console.log(`PLAY BOARD SIZE ${this.height} X ${this.width}`)
      console.log(`Start in position i: ${this.startPosition[0]}; j: ${this.startPosition[1]}`)
      console.log(`Your point now : ${this.points}`)
      const board = this.generateBoard()
      board.forEach(el => {
        console.log(el.join(" "))
      })
      this.sleep(700)
      this.clearScreen()
      this.points = 1
      let newData = this.startPosition[1]
      for (let i = this.startPosition[0]; i < board.length; i++) {
        for (let j = newData; j < board[i].length; j++) {
          if (board[i][j] === '.') {
            this.zonkPoints++
          } else {
            this.points++
          }
          board[i][j] = "☺︎"
          console.log(`PLAY BOARD SIZE ${this.height} X ${this.width}`)
          console.log(`Start in position i: ${this.startPosition[0]}; j: ${this.startPosition[1]}`)
          console.log(`Your point now : ${this.points}`)
          console.log(`Your zonk point now : ${this.zonkPoints}`)
          board.forEach(el => {
            console.log(el.join(" "))
          })
          this.sleep(700)
          this.clearScreen()
          board[i][j] = "."
          newData = 0
        }
      }
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === 'o') {
            this.skippedPositions.push([i, j])
          }
        }
      }
      console.log('FINISH')
      console.log(`Posisi yang di lompati :`)
      console.log(this.skippedPositions)
      console.log(`Dimainkan oleh ${name}`)
    }
  }
}
const pacManAdvance = new PacManAdvance(height, width, name)  
pacManAdvance.play()


// File: fsjs-p1-v2-c1-Barif7/pacManSad.js

"use strict"
const PacMan = require('./index')
let input = process.argv.slice(2)
let height = Number(input[0]);
let width = Number(input[1]);
class PacManSad extends PacMan {
  
  constructor(height, width) {
    super(height, width, 4, '☹︎')
  }
  checkValidate() {
    if (this.height < 3 || this.width < 3) {
      console.log(`Input height or width minimum 3`);
      return false;
    }
    if (this.height % 2 === 0 || this.width % 2 === 0) {
      console.log(`Input height or width must be an odd number`);
      return false;
    }
    if (this.countdown < 1 || this.countdown.length === 0) {
      console.log(`Input countdown do not accept minus`)
      return false;
    }
    return true;
  }
}
const pacManSad = new PacManSad(height, width)  
pacManSad.play()

