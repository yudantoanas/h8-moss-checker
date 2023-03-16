// File: fsjs-p1-v2-c1-cloneable01/index.js

"use strict"
class PacMan {
  
  constructor(height, width, countDown = 3){
    if (height <= 3) {
      return console.log('Input height minimum 3!')
    }
    if (width <= 3) {
      return console.log('Input width minimum 3!')
    }
    this.height = height
    this.width = width
    this.countDown = countDown
    this.points = 0
    this._skippedPosition = []
    this._startPosition = this._randomStartPosition()
  }
  
  set skippedPosition(pos) {
    const isDuplicate = this._skippedPosition.some(p => p.x === pos.x && p.y === pos.y)
    if (isDuplicate) {
      console.log('Position has already been skipped.')
      return
    }
    if (pos.x < 0 || pos.x >= this.height || pos.y < 0 || pos.y >= this.width) {
      console.log('Position is out of bounds.')
      return
    }
    this._skippedPosition.push(pos)
  }
  get skippedPosition() {
    return this._skippedPosition
  }
  get startPosition() {
    return this._startPosition
  }
  _randomStartPosition(){
    const i = Math.floor(Math.random() * this.height)
    const j = Math.floor(Math.random() * this.width)
    console.log ({ i, j })
  }
  countdownGame(){
    console.log('Starting game in...')
    let countdown = this.countDown;
    const countdownInterval = setInterval(() => {
      if (countdown <= 0) {
        clearInterval(countdownInterval)
        return
      }
      console.log(countdown)
      countdown--
    }, 1000)
  }
  generateBoard() {
    const board = [];
    for (let i = 0; i < this.height; i++) {
      const row = new Array(this.width).fill(`'o'`).join(`,`)
      board.push(row)
    }
    board.join('\n')
    console.log(board)
  }
  
  play(){
    this.generateBoard()
  }
  
  
  
  
  
  
  
  
  clearScreen () {
    
    console.clear()
  }
}
const game = new PacMan(4,5)
game.countdownGame()
game.generateBoard()


// File: fsjs-p1-v2-c1-cloneable01/pacManAdvance.js

"use strict"
class PacManAdvance {
  
}
const pacManAdvance = new PacManAdvance()  
pacManAdvance.play()

// File: fsjs-p1-v2-c1-cloneable01/pacManSad.js

"use strict"
class PacManSad {
  
}
const pacManSad = new PacManSad()  
pacManSad.play()

