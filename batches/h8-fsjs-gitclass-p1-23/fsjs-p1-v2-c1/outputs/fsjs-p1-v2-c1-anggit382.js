// File: fsjs-p1-v2-c1-anggit382/index.js

"use strict"
class PacMan {
  
    #skippedPositions;
    #startPosition
    constructor(height, width, countdown = 3,symbol = "☺︎") {
      this.height = height;
      this.width = width;
      this.countdown = countdown;
      this.points = 0;
      this.symbol = symbol;
      this.#skippedPositions = []
      this.#startPosition = this.randomStartPosition()
    }
    get skippedPositions() {
      return this.#skippedPositions
    }
  
    set skippedPositions(result) {
      this.#skippedPositions = result 
    }
    get startPosition() {
      return this.#startPosition
    }
    
    set startPosition(result) {
      this.#startPosition = result
    }
    randomStartPosition() {
      let result = []
          const randomNumberRow = Math.floor(Math.random() * (this.height));
          const randomNumberColumn = Math.floor(Math.random() * (this.width));
          result.push(randomNumberRow,randomNumberColumn);
      return result
    }
    validation() {
      if (this.height < 3) {
        console.log('Input height minimum 3!')
        return false
      } else if (this.width < 3) {
        console.log('Input width minimum 3!');
        return false
      } else if (this.countdown < 1 ) {
        console.log('Input countdown do not accept minus');
        return false
      }
      return true
    }
    generateBoard() {
      let result = [];
      for (let i = 0; i < this.height; i++) {
        let output = [];
        for (let j = 0; j < this.width; j++) {
          output.push('o')
        }
        result.push(output)
      }
      return result;
      
    }
    
    countDownGame(){
      for (let i = this.countdown; i >= 0; i--) {
          console.log(`COUNTDOWN : ${i}`)
          for (let j = 0; j < this.height; j++) {
            let output = ''
            for (let k = 0; k < this.width; k++) {
              output += ` ${i}`
            }
            console.log(output)
          }
          this.sleep(1000)
          this.clearScreen()
        }
    }
    play(){
      if (this.validation() == false) {
        return
      }
      this.countDownGame()
      let startJ = this.#startPosition[1]
      let board = this.generateBoard()
      for ( let i = this.#startPosition[0] ; i < board.length ; i ++ ){
        for ( let k = this.#startPosition[1] ; k < board[i].length ; k ++ ){
          board[i][k] = this.symbol
          this.points++
          console.clear()
          console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`)
          console.log(`Start in position i: ${this.#startPosition[0]} ; j: ${startJ}` )
          console.log(`Your point now : ${this.points}` )
          this.printBoard(board)
          board[i][k] = '.'
          this.#startPosition[1] = 0  
          this.sleep(1000)
        }           
      }
      this.skippedPosition(board)
      console.log(`FINISH`)  
      console.log(`Posisi Yang dilompati :`)
      console.log(this.skippedPositions);
      console.log(`Posisi Dimulai Dari :`)
      console.log(this.startPosition);
    }
    skippedPosition(board){
      let result = []
      for ( let i = 0 ; i < board.length ; i ++ ){
        for ( let k = 0 ; k < board[i].length ; k ++ ){
          if(board[i][k] == 'o'){
            result.push([i, k])
          }
        }
      }
      this.skippedPositions = result  
    }
    printBoard(board) {
      for (let i = 0; i < board.length; i++) {
        let row = "";
        for (let j = 0; j < board[i].length; j++) {
          row += board[i][j] + " ";
        }
        console.log(row);
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
const [height, width, countdown] = process.argv.slice(2)
const game = new PacMan(height, width, countdown)
game.play()
module.exports = PacMan


// File: fsjs-p1-v2-c1-anggit382/pacManAdvance.js

"use strict"
 
let PacMan = require("./index");
class PacManAdvance extends PacMan {
  
  constructor(height, width,playedBy = 'teddybear') {
    super(height, width, 5, "☻");
    this.playedBy = playedBy
    this.zonkPoints = 0
  }
  validation() {
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
      console.log('input height and width must be even');
      return false; 
    } else if (this.height !== this.width) {
      console.log('the input of both values must be the same');
      return false;
    }
    return true
  }
  generateBoard() {
      let board = [];
      const centerX = Math.floor(this.height/2 );
      const centerY = Math.floor(this.width/2 );
    for (let i = 0; i < this.width; i++) {
      let arrayIn = [];
      for (let j = 0; j < this.height; j++) {
        if ((i === centerY || i === centerY - 1) && (j === centerX || j === centerX - 1)) {
          arrayIn.push('.');
          } else {
          arrayIn.push('o');
        }
      }
      board.push(arrayIn);
    }
    return board;
  }
  play(){
    if (this.validation() == false) {
      return
    }
    this.countDownGame()
    let board = this.generateBoard()
    let startJ = this.startPosition[1]
    for ( let i = this.startPosition[0] ; i < board.length ; i ++){
      for ( let k = this.startPosition[1] ; k < board[i].length ; k ++){
        if(board[i][k] == '.'){
          this.zonkPoints++
        }else{
          this.points++
        }
        board[i][k] = this.symbol
        this.clearScreen()
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`)
        console.log(`Start in position i: ${this.startPosition[0]} ; j: ${startJ}` )
        console.log(`Your point now : ${this.points}` )
        console.log(`Your point Zonk Point now : ${this.zonkPoints}` )
        this.printBoard(board)
        console.log(`Posisi Dimulai Dari :`)
        console.log([this.startPosition[0],startJ]);
        board[i][k] = '.'
        this.startPosition[1] = 0  
        this.sleep(1000)
      }           
    }
    console.log(`FINISH`)  
    console.log(`Posisi Yang dilompati :`)
    console.log(this.skippedPositions);
  }
}
const [height, width,...playedBy] = process.argv.slice(2)
const pacManAdvance = new PacManAdvance(height, width,...playedBy) 
pacManAdvance.play()
console.log(pacManAdvance);


// File: fsjs-p1-v2-c1-anggit382/pacManSad.js

"use strict"
 
let PacMan = require("./index");
class PacManSad extends PacMan {
  
  constructor(height, width) {
    super(height, width, 4, "☹︎");
  }
  validation() {
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
      console.log('input height and width must be odd');
      return false; 
    }
    return true
  }
}
const [height, width, countdown] = process.argv.slice(2)
const pacManSad = new PacManSad(height, width, countdown) 
pacManSad.play()
pacManSad.validation()


