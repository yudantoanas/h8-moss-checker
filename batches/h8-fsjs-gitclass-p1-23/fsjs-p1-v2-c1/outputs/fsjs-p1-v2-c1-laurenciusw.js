// File: fsjs-p1-v2-c1-laurenciusw/index.js

"use strict"
class PacMan {
  
  #skippedPosition
  #startPosition
  constructor(height, width, countdown =3 ,symbol= '☺︎'  ) {
    this.height = height
    this.width = width
    this.countdown = countdown
    this.point = 0
    this.#skippedPosition = []
    this.#startPosition = this.randomStartPosition()
    this.symbol = symbol
  }
  get startPosition() {
    return this.#startPosition
  }
  get skippedPosition() {
    return this.#skippedPosition
  }
  set startPosition(value){
    this.#startPosition = value
  }
  
  set skippedPosition(value){
    this.#skippedPosition = value
  }
  
  randomStartPosition() {
    
    let i = Math.floor(Math.random() * this.height)
    let j = Math.floor(Math.random() * this.width)
    return [i, j]
  }
  validate() {
    if (this.height < 3) {
      console.log(`Input Height minimum 3 !`)
      return false
    }
    if (this.width < 3) {
      console.log(`input width minimum 3 !`)
      return false
    }
    if (this.countdown < 1) {
      console.log(`Minimum Countdown is 1!`)
      return false
    } 
    return true
  }
  countdownGame() {
    while (this.countdown >= 0) {
      console.log(`Countdown : ${this.countdown}`)
      for (let i = 0; i < this.height; i++) {
        let row = ''
        for (let j = 0; j < this.width; j++) {
          row += ` ${this.countdown}`
        }
        console.log(row)
      }
      this.sleep(1000)
      this.clearScreen()
      this.countdown--
    }
  }
  generateBoard() {
    let result = []
    for (let i = 0; i < this.height; i++) {
      let row = []
      for (let j = 0; j < this.width; j++) {
        row.push('o')
      }
      result.push(row)
    }
    return result
  }
  play() {
    if (this.validate() === false) {
      return
    } else {
      this.countdownGame()
      
      let startPos = this.#startPosition
      let board = this.generateBoard()
      let flag = false
          for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
              if(i===startPos[0] && j===startPos[1]){
                flag = true
              }
              if(flag){
              this.clearScreen()
              this.point++
              console.log(`Ukuran board adalah ${this.height} x ${this.width}`)
              console.log(`Your starting position is i: ${startPos[0]} ,j:${startPos[1]}`)
              console.log(`Your Point(s) : ${this.point}`)
              
                board[i][j] = this.symbol
                console.log(board.map(test =>test.join(" ")).join('\n'))
                this.sleep (1000)
                
                board[i][j] = '.'
              }else{
                this.#skippedPosition.push([i,j])      
              } 
            }
          }
          console.log(`FINISH!!`)
          console.log(`Titik yang di lewati adalah :`)
          console.log(this.#skippedPosition)
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
clearScreen() {
  
  
  console.clear();
}
}
let [height, width, countdown] = process.argv.slice(2)
height = +height
width = +width
countdown =+countdown
if(Number.isNaN(countdown)){
  countdown = undefined
}
let game = new PacMan(height, width, countdown)
module.exports = PacMan

// File: fsjs-p1-v2-c1-laurenciusw/pacManAdvance.js

"use strict"
let PacMan = require(`./index.js`)
class PacManAdvance extends PacMan {
  
  constructor(height, width, playedBy) {
    super(height, width, 5, '☻')
    this.playedBy = playedBy
    this.zonkPoint = 0
  }
  
  validate() {
    if (this.height % 2 === 1 || this.height < 4) {
      console.log(`Input harus genap & minimum 4 !`)
      return false
    }
    if (this.width % 2 === 1 || this.width < 4) {
      console.log(`Input harus genap & minimum 4 !`)
      return false
    }
    if (this.width !== this.height) {
      console.log((`Height dan Width must be equal!`))
      return false
    }
    return true
  }
  play() {
    if (this.validate() === false) {
      return
    } else {
      this.countdownGame()
      let startPos = this.startPosition
      let board = this.generateBoard()
      let i = (this.height / 2) -1
      let j = (this.width / 2) -1
      board[i][j] = '.'
      board[i][j+1] = '.'
      board[i+1][j] = '.'
      board[i+1][j+1] = '.'
      let flag = false
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (i === startPos[0] && j === startPos[1]) {
            flag = true
          }
          if (flag) {
            this.clearScreen()
            if(board[i][j] === '.'){ 
              this.zonkPoint ++
            }else{
              this.point++
            }
            console.log(`Ukuran board adalah ${this.height} x ${this.width}`)
            console.log(`Your starting position is i: ${startPos[0]} ,j:${startPos[1]}`)
            console.log(`Your Point(s) : ${this.point}`)
            console.log(`Your Zonk Point(s) : ${this.zonkPoint}`)
            board[i][j] = this.symbol
            console.log(board.map(test => test.join(" ")).join('\n'))
            this.sleep(1000)
            board[i][j] = '.'
          } else {
            this.skippedPosition.push([i, j])
          }
        }
      }
      console.log(`FINISH!!`)
      console.log(`Titik yang di lewati adalah :`)
      console.log(this.skippedPosition)
      console.log(`Played by : ${this.playedBy}`)
    }
  }
}
let [height, width, playedBy] = process.argv.slice(2)
height = +height
width = +width
let pacManAdvance = new PacManAdvance(height, width, playedBy)  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-laurenciusw/pacManSad.js

"use strict"
let PacMan = require(`./index.js`)
class PacManSad extends PacMan {
  
  constructor(height, width){
    super(height, width, 4, '☹︎' )   
  }
  validate() {
    if (this.height % 2 === 0 || this.height < 3) {
      console.log(`Input harus ganjil & minimum 3 !`)
      return false
    }
    if (this.width %2 ===0 || this.width < 3) {
      console.log(`Input harus ganjil & minimum 3 !`)
      return false
    }  
    return true
  }
}
  
let [height, width] = process.argv.slice(2)
height = +height
width = +width
let pacManSad = new PacManSad(height,width)  
pacManSad.play()

