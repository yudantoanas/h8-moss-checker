// File: fsjs-p1-v2-c1-renggagilang/index.js

"use strict"
let args = process.argv
class PacMan {
  
  #skippedPositions
  #startPosition
  constructor(height, width, countdown = 3, symbol = '☺︎'){
    this.height = Number(height)
    this.width = Number(width)
    this.countdown = Number(countdown)
    this.points = 0
    
    this.#skippedPositions = []
    this.#startPosition = this.randomStartPosition()
    this.symbol = symbol
  }
  
  randomStartPosition(){
    let randomHeight = Math.floor(Math.random() *this.height)
    let randomWidth = Math.floor(Math.random() * this.width)
    return [randomHeight, randomWidth]
  }
  validation(){
    let condition = true
    if(this.height < 3){
      console.log('Input Height minimum 3!')
      condition = false
    }
    if(this.width < 3){
      console.log('Input Width minimum 3!')
      condition = false
    }
    if(this.countdown <= 0){
      console.log('Input countdown do not accept minus!')
      condition = false
    }
    return condition
  }
  countdownGame(){
    let length = this.height * this.width
    let countdown = this.countdown
    while(countdown !== -1){
      let boardCountdown = ''
      for (let i = 0; i < length; i++) {
        if( (i + 1) % this.width === 0){
          boardCountdown += countdown + '\n'
        }else{
          boardCountdown += countdown + ' '
        }
      }
      console.log(`COUNTDOWN: ${countdown}`)
      console.log(boardCountdown)
      this.sleep()
      this.clearScreen()
      countdown--
    }
  }
  generateBoard(){
    let length = this.height * this.width
    let o = 'o'
    let board = []
    let tmp = []
    for (let i = 0; i < length; i++) {
      tmp.push(o)
      if(this.width === tmp.length){
        
        board.push(tmp)
        tmp = []
      }
    }
    return board
  }
  skipPosition(){
    let randomPosition = this.startPosition
    let condition = true
    for (let i = 0; i < this.height; i++) {
      if(!condition) break;
      for (let j = 0; j < this.width; j++) {
        if(`${randomPosition[0]}${randomPosition[1]}` !== `${i}${j}`){
          this.skippedPositions.push([i, j])
        }else{
          condition = false
          break;
        }
      }
    }
  }
  get skippedPositions(){
    return this.#skippedPositions
  }
  set skippedPositions(arr){
    this.#skippedPositions = arr
  }
  get startPosition(){
    return this.#startPosition
  }
  set startPosition(arr){
    this.#startPosition = arr
  }
  play(){
    if(!this.validation()) {
      return 'Invalid input'
    }
    this.countdownGame()
    this.skipPosition()
    let boardSize = `PLAY BOARD SIZE ${this.height} x ${this.width}`
    let Position = `Start in position i: ${this.#startPosition[0]}; j: ${this.#startPosition[1]}`
    let points = this.points
    let symbol = this.symbol
    let board = ''
    let generatedBoard = this.generateBoard()
    console.log(boardSize)
    console.log(Position)
    console.log(`Your point now : ${points}`)
    generatedBoard.forEach(function(el, i, arr){  
      board += el.join(' ')
      if(i !== arr.length - 1){
        board += '\n'
      }
    })
    console.log(board)
    board = ''
    this.sleep()
    this.clearScreen()
    
    for (let i = this.#startPosition[0]; i < generatedBoard.length; i++) {
      let j = this.#startPosition[1]
      if(i > this.#startPosition[0]) j = 0
      for (j; j < generatedBoard[i].length;j++) {
        if(generatedBoard[i][j]){
          generatedBoard[i][j] = symbol
          points++
        }
        if(generatedBoard[i][j - 1] === symbol) {
          generatedBoard[i][j - 1] = '.'
        }
        generatedBoard.forEach(function(el, i, arr){  
          board += el.join(' ')
          if(i !== arr.length - 1){
            board += '\n'
          }
        })
        console.log(boardSize)
        console.log(Position)
        console.log(`Your point now : ${points}`)
        console.log(board)
        this.sleep()
        if((i+1) * (j+1) !== this.height * this.width){
        this.clearScreen()
        board = ''
        }
        else {
          console.log(`FINISH\nPosisi yang di lompati :`)
          console.log(this.#skippedPositions)
        }
      }
      generatedBoard[i][generatedBoard[i].length - 1] = '.'
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

// File: fsjs-p1-v2-c1-renggagilang/pacManAdvance.js

"use strict"
let args = process.argv
const PacMan = require('./index')
class PacManAdvance extends PacMan {
  
  constructor(height, width, playedBy) {
    super(height, width, 5, '☻')
    this.playedBy = playedBy
    this.zonkPoints = 0
  }
  validation() {
    let condition = true
    if (this.width < 4 || this.height < 4 && this.width % 2 !== 0 || this.height % 2 !== 0) {
      console.log('height and weight minimum 4 and input must be even number')
      condition = false
    }
    if (this.width !== this.height){
      console.log('width and height must be same number')
      condition = false
    }
    return condition
  }
  generateBoard() {
    let o = 'o'
    let board = []
    let tmp = []
    let height = 0
    let width = 0
    let length = this.height * this.width
    for (let i = 1; i <= length; i++) {
      width++
      if (height === this.height / 2 || height === this.height / 2 - 1) {
        if (width === this.width / 2 || width === this.width / 2 + 1) {
          tmp.push('.')
        } else {
          tmp.push(o)
        }
      } else {
        tmp.push(o)
      }
      if (this.width === tmp.length) {
        board.push(tmp)
        tmp = []
        width = 0
        height++
      }
    }
    return board
  }
  play() {
    if (!this.validation()) return 'Invalid Input'
    this.countdownGame()
    this.skipPosition()
    let points = this.points
    let symbol = this.symbol
    let board = ''
    let zonkScore = this.zonkPoints
    let generatedBoard = this.generateBoard()
    console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`)
    console.log(`Start in position i: ${this.startPosition[0]} j: ${this.startPosition[1]}`)
    console.log(`Your point now : ${points}`)
    console.log(`Your zonk point now : ${zonkScore}`)
    generatedBoard.forEach(function (el, i, arr) {
      board += el.join(" ")
      if (i !== arr.length - 1) {
        board += "\n"
      }
    })
    console.log(board)
    board = ''
    this.sleep()
    this.clearScreen()
    for (let i = this.startPosition[0]; i < generatedBoard.length; i++) {
      let j = this.startPosition[1]
      if (i > this.startPosition[0]) j = 0
      for (let j=0; j < generatedBoard[i].length; j++) {
        if (generatedBoard[i][j] == 'o') {
          generatedBoard[i][j] = symbol
          points++
        } 
        else {
          generatedBoard[i][j] = symbol
          zonkScore++
        }
        if (generatedBoard[i][j - 1] === symbol) {
          generatedBoard[i][j - 1] = '.'
        }
        generatedBoard.forEach(function (el, i, arr) {
          board += el.join(' ')
          if (i !== arr.length - 1) {
            board += '\n'
          }
        })
        console.log(`PLAY BOARD SIZE ${this.height} x ${this.width}`)
        console.log(`Start in position i: ${this.startPosition[0]} j: ${this.startPosition[1]}`)
        console.log(`Your point now : ${points}`)
        console.log(`Your zonk point now : ${zonkScore}`)
        console.log(board)
        this.sleep()
        if ((i + 1) * (j + 1) !== this.height * this.width) {
          this.clearScreen()
          board = ''
        } 
        else {
          console.log('FINISH\nPosisi yang di lompati :')
          console.log(this.skippedPositions)
          console.log(`Dimainkan oleh ${this.playedBy}`)
        }
      }
      generatedBoard[i][generatedBoard[i].length -1] = '.'
    }
  }
}
const pacManAdvance = new PacManAdvance(args[2], args[3], args[4])  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-renggagilang/pacManSad.js

"use strict"
let args = process.argv
const PacMan = require('./index')
class PacManSad extends PacMan{
  
  constructor(height, width){
    super(height, width, 4, '☹︎')
  }
  validation() {
    let condition = true
    if (this.width < 3 || this.height < 3 && this.width % 2 === 0 || this.height % 2 === 0) {
      console.log('height and weight minimum 3 and input must be odd number')
      condition = false
    }
    return condition
  }
  
}
const pacManSad = new PacManSad(args[2], args[3])  
pacManSad.play()

