// File: fsjs-p1-v2-c1-Maatd23/index.js

"use strict";
class PacMan {
  
  #skippedPositions;
  #startPosition;
  constructor(height, width, countdown = 3, symbol = "☺︎") {
    this.height = height;
    this.width = width;
    this.countdown = countdown;
    this.point = 0;
    this.symbol = symbol
    this.#skippedPositions = [];
    this.#startPosition = this.randomStartPosition();
  }
  get startPosition(){
    return this.#startPosition
  }
  set skippedPositions(value) {
    return this.skippedPositions = value
  }
  get skippedPositions () {
    return this.#skippedPositions
  }
  set startPosition(value){
    return this.startPosition = value
  }
  
  validasi() {
    let result = true;
    if (this.height < 3 || Number.isNaN(this.width)) {
      console.log("Input height Minium 3");
      result = false;
    }
    if (this.width < 3 || Number.isNaN(this.width)) {
      console.log("Input width Minium 3");
      result = false;
    }
    if (this.countdown < 0) {
      console.log("Input countdown do not accept minus");
      result = false;
    }
    return result;
  }
  randomStartPosition() {
    let result = [];
    let randomI = Math.floor(Math.random() * (this.height - 1));
    result.push(randomI);
    let randomJ = Math.floor(Math.random() * (this.width - 1));
    result.push(randomJ);
    return result;
  }
  countdownGame() {
    let count = this.countdown;
    while (count >= 0) {
      console.log(`countdown: ${count}`);
      for (let i = 0; i < this.height; i++) {
        let row = "";
        for (let j = 0; j < this.width; j++) {
          row += `${count} `;
        }
        console.log(row);
      }
      this.sleep(700);
      this.clearScreen();
      count--;
    }
  }
  generateBoard() {
    let result = [];
    for (let i = 0; i < this.height; i++) {
      let tempArr = [];
      for (let j = 0; j < this.width; j++) {
        tempArr.push("o");
      }
      result.push(tempArr);
    }
    return result;
  }
  play() {
    if (this.validasi() === true) {
      this.countdownGame();
      let board = this.generateBoard();
      let [i, j] = this.startPosition;
      for (i; i < this.height; i++) {
        for (j; j < this.width; j++) {
          this.clearScreen();
          console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
          console.log(`start in position  i: ${this.startPosition[0]}; j : ${this.startPosition[1]}`);
          if(board[i][j] === "o"){
            this.point++;
          }
          console.log(`your point now ${this.point}`);
          board[i][j] = this.symbol;
          for (let n = 0; n < board.length; n++) {
            let row = "";
            for (let x = 0; x < board[n].length; x++) {
              row += `${board[n][x]} `;
            }
            console.log(row);
          }
          this.sleep(1000);
          board[i][j] = ".";
        }
        j = 0;
      }
      console.log("Finish");
      
      for (let n = 0; n < board.length; n++) {
        for (let x = 0; x < board[n].length; x++) {
          if (board[n][x] === "o") this.skippedPositions.push([n, x]);
        }
      }
      if (this.skippedPositions.length === 0){
        console.log(`posisi yang di loncati :\n`,`tidak ada posisi yang di loncati`);
      }else{
        console.log(`posisi yang di loncati :\n`, this.skippedPositions);
      }
    }
  }
  sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  clearScreen() {
    
    
    console.clear();
  }
}
let input = process.argv.slice(2);
const height = +input[0];
const width = +input[1];
let countdown = +input[2];
if (Number.isNaN(countdown)) {
  countdown = undefined;
}
const game = new PacMan(height, width, countdown); 
game.play();
module.exports = PacMan 

// File: fsjs-p1-v2-c1-Maatd23/pacManAdvance.js

"use strict"
let PacMan = require("./index")
class PacManAdvance extends PacMan {
  constructor(height, width, name) {
    super(height, width, 5, "☻")
    this.playedBy = name;
    this.zhonkPoints = 0;
  }
  validasi() {
    let result = true;
    if (this.height !== this.width) {
      console.log("Panjang dan lebar kotaknya tidak sama isi yang sama dong");
      result = false;
    }
    if (this.height % 2 !== 0 || this.width % 2 !== 0) {
      console.log("Panjang atau lebarnya bukan bilangan genap tolong isi bilangan genap");
      result = false;
    }
    if (this.height < 4 || this.width < 4) {
      console.log("Panjang dan lebar kotaknya minimal 4");
      result = false;
    }
    return result;
  }
  generateBoard() {
    let result = super.generateBoard();
    
    result[result.length / 2 - 1][result.length / 2 - 1] = ".";
    result[result.length / 2 - 1][result.length / 2] = ".";
    result[result.length / 2][result.length / 2 - 1] = ".";
    result[result.length / 2][result.length / 2] = ".";
    return result;
  }
  play() {
    if (this.validasi() === true) {
      this.countdownGame();
      let board = this.generateBoard();
      let [i, j] = this.startPosition;
      for (i; i < this.height; i++) {
        for (j; j < this.width; j++) {
          this.clearScreen();
          console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
          console.log(`start in position  i: ${this.startPosition[0]}; j : ${this.startPosition[1]}`);
          if (board[i][j] === "o") {
            this.point++;
          } else if (board[i][j] === ".") {
            this.zhonkPoints++;
          }
          console.log(`your point now ${this.point}`);
          console.log(`your zonk point now ${this.zhonkPoints}`);
          board[i][j] = this.symbol;
          for (let n = 0; n < board.length; n++) {
            let row = "";
            for (let x = 0; x < board[n].length; x++) {
              row += `${board[n][x]} `;
            }
            console.log(row);
          }
          this.sleep(800);
          board[i][j] = ".";
        }
        j = 0;
      }
      console.log("Finish");
      
      for (let n = 0; n < board.length; n++) {
        for (let x = 0; x < board[n].length; x++) {
          if (board[n][x] === "o") this.skippedPositions.push([n, x]);
        }
      }
      if (this.skippedPositions.length === 0) {
        console.log(`posisi yang di loncati :\ntidak ada posisi yang di loncati`);
      } else {
        console.log(`posisi yang di loncati :\n`, this.skippedPositions);
      }
      console.log(`Dimainkan oleh ${this.playedBy}`);
    }
  }
}
let input = process.argv.slice(2);
const height = +input[0];
const width = +input[1];
let name = input[2];
const pacManAdvance = new PacManAdvance(height, width, name);  
pacManAdvance.play();


// File: fsjs-p1-v2-c1-Maatd23/pacManSad.js

"use strict"
let PacMan = require("./index")
class PacManSad extends PacMan{
  
  constructor(height, width ){
    super(height, width, 4, "☹︎")
    
  }
  validasi() {
    let result = true;
    if(this.height !== this.width) {
      console.log("Height and Width not same");
      result = false;
    }else if(this.height % 2 !== 1 || this.width % 2 !== 1) {
      console.log("Height or width not even number");
      result = false;
    }else if(this.height < 3 || this.width < 3) {
      console.log("Height or width less than 4");
      result = false;
    }else{
      return result;
    }
  }
}
let input = process.argv.slice(2);
const height = +input[0];
const width = +input[1];
let countdown = +input[2];
if (Number.isNaN(countdown)) {
  countdown = undefined;
}
const pacManSad = new PacManSad(height, width, countdown)  
pacManSad.play()

