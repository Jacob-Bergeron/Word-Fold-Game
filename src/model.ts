
import { config1, config2, config3 } from './puzzle'

export class Coordinate {
    readonly row : number
    readonly column : number

    constructor(row:number, column:number) {
      this.row = row
      this.column = column
    }
}

export class Board {
    letters : string[][]
    selectedSquare : Coordinate | undefined

    constructor() {
        this.letters = []
        for (let r:number = 0; r < 5; r++) {
            this.letters[r] = []
            for (let c:number = 0; c < 5; c++) {
                this.letters[r][c] = ''
            }
        }

        this.selectedSquare = undefined
    }
}

export class Model {
    words : string[]
    board : Board
    numMoves : number
    score : number
    readonly configs = [ config1, config2, config3]
    chosen : number

    /** which is zero-based. */
    constructor(which:number) {
        this.chosen = which
        let puzzle =  this.configs[this.chosen]
        let board = new Board()
        this.numMoves = 0
        this.score = 0
        this.words = []
        for (let r:number = 0; r < 5; r++) {
            this.words[r] = puzzle.words[r]

            for (let c:number = 0; c < 5; c++) {
                board.letters[r][c] = puzzle.initial[r][c]
            }
        }
        this.board = board
    }

    contents(row:number, column:number) {
        return this.board.letters[row][column]
    }
}