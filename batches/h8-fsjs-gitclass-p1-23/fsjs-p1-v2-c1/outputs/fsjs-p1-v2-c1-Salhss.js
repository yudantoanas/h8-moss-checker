// File: fsjs-p1-v2-c1-Salhss/index.js

"use strict"
class PacMan {
  
  #skippedPositions
  #startPosition
  constructor(height, width, countdown = 3, emote = '☺︎') {
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.point = 0;
    this.#skippedPositions = [];
    this.#startPosition = this.randomStartPosition();
    this.emote = emote;
  }
  get startPosition() {
    return this.#startPosition;
  }
  set startPosition(value) {
    this.#startPosition = value;
  }
  get skippedPosition() {
    return this.#skippedPositions;
  }
  set skippedPosition(value) {
    this.#skippedPositions = value;
  }
  
  validateInput() {
    if (this.height < 3) {
      console.log(`input height minimum 3!`);
      return false;
    }
    if (this.width < 3) {
      console.log(`input width minimum 3!`);
      return false;
    }
    if (this.countdown < 0) {
      console.log(`input countdown do not accept minus!`);
      return false;
    }
    return true;
  }
  
  randomStartPosition() {
    let i = Math.floor(Math.random() * this.height);
    let j = Math.floor(Math.random() * this.width);
    let result = [i, j];
    return result;
  }
  countdownGame() {
    let counter = 0;
    for (let i = 0; i < this.countdown; i++) {
      console.log(`COUNTER : ${this.countdown - counter}`);
      console.log(this.generateBoard(this.countdown - counter).map(row => row.join(' ')).join('\n'));
      this.sleep(1000);
      this.clearScreen();
      counter++;
    }
  }
  generateBoard(fill = 'o') {
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let board = [];
      for (let j = 0; j < this.width; j++) {
        board.push(fill);
      }
      result.push(board);
    }
    return result;
  }
  play() {
    let validate = this.validateInput();
    if (!validate) return "";
    this.countdownGame()
    let border = this.generateBoard('o');
    let startPoint = false;
    for (let k = 0; k < this.height; k++) {
      for (let m = 0; m < this.width; m++) {
        if (k === this.#startPosition[0] && m === this.#startPosition[1]) {
          startPoint = true;
        }
        if (startPoint) {
          this.point++;
          this.clearScreen();
          console.log(`PLAY BOARD SIZE ${this.height} X ${this.width}`)
          console.log(`Start in position i:${this.#startPosition[0]}; j:${this.#startPosition[1]}`);
          console.log(`Your point now: ${this.point}`);
          border[k][m] = this.emote;
          for (let i = 0; i < border.length; i++) {
            let temp = ''
            for (let j = 0; j < border[i].length; j++) {
              temp += border[i][j];
            }
            console.log(temp);
          }
          this.sleep(1000);
          border[k][m] = '.';
        }
      }
    }
    console.log ("FINISH");
    let skipped = this.#skippedPositions;
    for (let i = 0; i < border.length; i++) {
      for (let j = 0; j < border[i].length; j++) {
        if (border[i][j] === 'o') {
          skipped.push([i,j]);
        } 
      }
      
    }
    console.log("Posisi yang dilompati", skipped);
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
module.exports = PacMan;

// File: fsjs-p1-v2-c1-Salhss/pacManAdvance.js

"use strict"
const PacMan = require ('./index');
class PacManAdvance extends PacMan {
  
  constructor (height, width, playedBy){
    super (height, width, 5, "☻",)
    this.playedBy = playedBy;
    this.zonkPoints = 0;
  }
  validateInput() {
    if (this.height % 2 === 1 || this.height < 4) {
      console.log(`input height minimum 4 and must be even number!`);
      return false;
    }
    if (this.width % 2 === 1 || this.width < 4) {
      console.log(`input width minimum 4 and must be even number!`);
      return false;
    }
    if (this.countdown < 0) {
      console.log(`input countdown do not accept minus!`);
      return false;
    }
    return true;
  }
  
  
  
  
  
  
  
  
  play () {
    let validate = this.validateInput();
    if (!validate) return "";
    this.countdownGame()
    let border = this.generateBoard('o');
    let i = border.length/2 -1
    let j = border.length/2 -1
    border[i][j] = '.';
    border[i][j+1] = '.';
    border[i+1][j] = '.';
    border[i+1][j+1] = '.';
    let startPoint = false;
    for (let k = 0; k < this.height; k++) {
      for (let m = 0; m < this.width; m++) {
        if (k === this.startPosition[0] && m === this.startPosition[1]) {
          startPoint = true;
        }
        if (startPoint) {
          if (border[k][m] === '.') {
            this.zonkPoints++;
          } else {
            this.point++;
          }
          this.clearScreen();
          console.log(`PLAY BOARD SIZE ${this.height} X ${this.width}`)
          console.log(`Start in position i:${this.startPosition[0]}; j:${this.startPosition[1]}`);
          console.log(`Your point now: ${this.point}`);
          console.log(`Your zonk point now: ${this.zonkPoints}`);
          border[k][m] = this.emote;
          for (let i = 0; i < border.length; i++) {
            let temp = ''
            for (let j = 0; j < border[i].length; j++) {
              temp += border[i][j];
            }
            console.log(temp);
          }
          this.sleep(1000);
          border[k][m] = '.';
        }
      }
    }
    console.log ("FINISH");
    let skipped = this.skippedPosition;
    for (let i = 0; i < border.length; i++) {
      for (let j = 0; j < border[i].length; j++) {
        if (border[i][j] === 'o') {
          skipped.push([i,j]);
        } 
      }
      
    }
    console.log("Posisi yang dilompati", skipped);
    console.log(`Dimainkan oleh`, this.playedBy)
  }
}
const input = process.argv.slice(2);
const pacManAdvance = new PacManAdvance(+input[0], +input[1], input[2])  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-Salhss/pacManSad.js

"use strict"
const PacMan = require ('./index');
class PacManSad extends PacMan {
  
  constructor (height, width, countdown = 3, emote = '☺︎'){
  super (height, width, 4, "☹︎");
  }
  validateInput() {
    if (this.height % 2 === 0 || this.height < 3) {
      console.log(`input height minimum 4 and must be odd number!`);
      return false;
    }
    if (this.width % 2 === 0 || this.width < 3) {
      console.log(`input width minimum 4 and must be odd number!`);
      return false;
    }
    if (this.countdown < 0) {
      console.log(`input countdown do not accept minus!`);
      return false;
    }
    return true;
  }
  
}
const input = process.argv.slice(2);
const pacManSad = new PacManSad(+input[0], +input[1])  
pacManSad.play();


