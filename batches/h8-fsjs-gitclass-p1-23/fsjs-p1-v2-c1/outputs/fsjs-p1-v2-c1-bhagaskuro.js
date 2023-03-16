// File: fsjs-p1-v2-c1-bhagaskuro/index.js

"use strict"
const input = process.argv.slice(2)
let height = +input[0]
let width = +input[1]
let countdown = +input[2]
countdown = Number.isNaN(countdown) ? undefined : countdown
class PacMan {
  
  #skippedPositions
  #startPosition
  constructor(height, width, countdown = 3, symbol ='☺︎') {
    this.height            = height
    this.width             = width
    this.countdown         = countdown
    this.points            = 0
    this.#skippedPositions = []
    this.#startPosition    = this.randomStartPosition()
    this.symbol            = symbol
  }
  randomStartPosition() {
    let position = []
    position.push(Math.floor(Math.random() * height))
    position.push(Math.floor(Math.random() * width))
    return position
  }
  
  
  get startPosition() {
    return this.#startPosition
  }
  
  
  set startPosition(value) {
    this.#startPosition = value
  }
  
  get skippedPositions() {
    return this.#skippedPositions
  }
  
  set skippedPositions(value) {
    this.#skippedPositions = value
  }
  
  validation() {
    let result = false
    if (this.height < 3 || Number.isNaN(this.height)) {
      console.log('Input height minimum 3!')
      result = true
    }
    if (this.width < 3 || Number.isNaN(this.width)) {
      console.log('Input width minimum 3!')
      result = true
    }
    if (this.countdown < 0) {
      console.log('Input countdown do not accept minus!')
      result = true
    }
    return result
  }
  
  countdownGame() {
    let board = []
    let text = ''
    for (let count = this.countdown; count > 0; count--) {
      
      
      board.push([])
      for (let j = 0; j < this.width; j++) {
        board.push(count)
      }
      text = board.join(' ');
      
      console.log('COUNTDOWN : ' + count)
      for (let i = 0; i < this.height; i++) {
        console.log(text)
      }
      
      board = []
      this.sleep(1000)
      this.clearScreen()
    }
  }
  
  generateBoard() {
    let board = []
    for (let i = 0; i < this.height; i++) {
      board.push([])
      for (let j = 0; j < this.width; j++) {
        board[i].push('o')
      }
    }
    return board
  }
  
  play() {
    
    if (this.validation() !== false) return
    
    this.countdownGame()
    
    let board = this.generateBoard()
    
    let flag = false
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        
        if (i === this.startPosition[0] && j === this.startPosition[1]) {
          flag = true
        }
        
        if (flag) {
          this.clearScreen()
          this.points += 1
          console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
          console.log(`Start in position i: ${this.startPosition[0]}; j: ${this.startPosition[1]}`);
          console.log(`Your point now : ${this.points}`);
          board[i][j] = this.symbol
          for (const perSecond of board) {
            console.log(perSecond.join(" "));
          }
          this.sleep(1000)
          board[i][j] = "."
        } 
        else {
          this.skippedPositions.push([i, j])
        }
      }
    }
    
    console.log("\n FINISH!");
    console.log("Posisi yang di lompati :");
    console.log(this.skippedPositions);
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
module.exports = PacMan


// File: fsjs-p1-v2-c1-bhagaskuro/pacManAdvance.js

"use strict"
let PacMan = require('./index')
const input = process.argv.slice(2)
let height = +input[0]
let width = +input[1]
let playedBy = input[2]
class PacManAdvance extends PacMan{
  
  constructor(height, width, playedBy = 'Guest'){
    super(height, width, 5, '☻')
    this.playedBy          = playedBy
    this.zonkPoint         = 0
  }
  
  validation() {
    let result = false
    if (this.height%2==1 || this.height< 4 || Number.isNaN(this.height)) {
      console.log('Input height minimum 4! and must be an Even number')
      result = true
    }
    if (this.width%2==1 || this.width< 4|| Number.isNaN(this.width)) {
      console.log('Input width minimum 4! and must be an Even number')
      result = true
    }
    if (this.width !== this.height) {
      console.log('Input must have same number')
      result = true
    }
    return result
  }
  zonkArea(){
    let board  = this.generateBoard()
    let center = board.length/2
    let zonk   = [[center-1,center-1], [center-1,center], [center, center-1],[center,center]]
    
    
    for (let i=0 ; i< board.length ; i++) {
      for (let x=0 ; x<board[i].length ; x++) {
        
        for (let z=0 ; z<zonk.length ; z++)
        {
          
          if (i==zonk[z][0] && x==zonk[z][1]){
            board[i][x] = '.'
          }
        }
      }
    }
    return board
  }
  
  play() {
    
    if (this.validation() !== false) return
    
    this.countdownGame()
    
    let board = this.zonkArea()
    
    let flag = false
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        
        if (i === this.startPosition[0] && j === this.startPosition[1]) {
          flag = true
        }
        
        if (flag) {
          this.clearScreen()
          
          if (board[i][j] == 'o'){
            this.points += 1
          }
          else{
            this.zonkPoint += 1
          }
          
          console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`);
          console.log(`Start in position i: ${this.startPosition[0]}; j: ${this.startPosition[1]}`);
          console.log(`Your point now : ${this.points}`);
          console.log(`Your Zonk point now : ${this.zonkPoint}`);
          board[i][j] = this.symbol
          for (const perSecond of board) {
            console.log(perSecond.join(" "));
          }
          this.sleep(1000)
          board[i][j] = "."
        } 
        else {
          this.skippedPositions.push([i, j])
        }
      }
    }
    
    console.log("\nFINISH!\n");
    console.log("Posisi yang di lompati :");
    console.log(this.skippedPositions);
    console.log('Dimainkan oleh' , playedBy)
  }
}
const pacManAdvance = new PacManAdvance(height, width, playedBy)  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-bhagaskuro/pacManSad.js

"use strict"
let PacMan = require('./index')
const input = process.argv.slice(2)
let height = +input[0]
let width = +input[1]
class PacManSad extends PacMan{
  
  constructor(height, width){
    super(height, width, 4 , '☹︎')
  }
  
  
  validation() {
    let result = false
    if (this.height%2==0 || this.height< 3 || Number.isNaN(this.height)) {
      console.log('Input height minimum 3! and must be an Odd number')
      result = true
    }
    if (this.width%2==0 || this.width< 3|| Number.isNaN(this.width)) {
      console.log('Input width minimum 3! and must be an Odd number')
      result = true
    }
    return result
  }
}
const pacManSad = new PacManSad(height, width)  
pacManSad.play()


