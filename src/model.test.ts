import { expect, test } from 'vitest'
import { Board, Coordinate, Model } from './model'


test('Home', async () => {
        let m:Model = new Model(0)     // start with first configuration

        expect(m.board.letters[0][0]).toBe("E")
        expect(m.numMoves).toBe(0)
        expect(m.score).toBe(0)
    }
)

test('Board', () => {
    let b: Board = new Board()

    expect(b.selectedSquare).toBe(undefined)

    }
)

test('Coordinate', () => {
    let c: Coordinate | undefined = new Coordinate(0,0)

    expect(c.column).toBe(0)
    expect(c.row).toBe(0)

    }
)




