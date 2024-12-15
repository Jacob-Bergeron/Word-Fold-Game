'use client'                              // directive to clarify client-side. Place at top of ALL .tsx files
import React, { useState } from 'react'

import { Coordinate, Model } from '../model'
import { dir } from 'console'

export default function Home() {
  // initial instantiation of the Model comes from the first configuration
  const [model, setModel] = React.useState(new Model(0))
  const [redraw, forceRedraw] = React.useState(0)


  // Helper Function(s)
  // -----------------------------

  function getSelected() {
    return model.board.selectedSquare;
  }

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  // check if a sqaure is selected
  function checkSelected() {
    if (model.board.selectedSquare != undefined) {
      return true
    }
    return false
  }


  function correctLength(coor: Coordinate, r: number, c: number) {
    if (model.board.letters[coor.row][coor.column].length + model.board.letters[r][c].length <= 6) {
      return true
    }
    return false
  }


  // moveIsValid
  // In order for a move to be valid:
  // - must not go off the board
  // - must not move into an empty square
  // - the contents of the current square + target square must be <= 6
  function moveIsValid(direction: string) {
    let selected = getSelected()

    if (selected) {
      if (direction == "down") {
        // if the selected square is at bottom of board
        if (selected.row == 4) {
          return false;
        }
        // else if the row below is NOT empty and has less than 6
        else if (hasContents(selected.row + 1, selected.column) && correctLength(selected, selected.row + 1, selected.column)) {
          return true
        }
        else {
          return false
        }
      }
      else if (direction == "up") {
        // if the selected square is at top of board
        if (selected.row == 0) {
          return false;
        }
        // else if the row below is NOT empty
        else if (hasContents(selected.row - 1, selected.column) && correctLength(selected, selected.row - 1, selected.column)) {
          return true
        }
        else {
          return false
        }
      }
      else if (direction == "right") {
        // if the selected square is at on right side
        if (selected?.column == 4) {
          return false;
        }
        // else if the col to the right is NOT empty
        else if (hasContents(selected.row, selected.column + 1) && correctLength(selected, selected.row, selected.column + 1)) {
          return true
        }
        else {
          return false
        }
      }
      else if (direction == "left") {
        // if the selected square is on left side
        if (selected?.column == 0) {
          return false;
        }
        // else if the col to the left is NOT empty
        else if (hasContents(selected.row, selected.column - 1) && correctLength(selected, selected.row, selected.column - 1)) {
          return true
        }
        else {
          return false
        }
      }
    }
  }


  // checks to see if the param square has contents
  function hasContents(r: number, c: number) {
    if (model.board.letters[r][c] != '') {
      return true
    }
    else {
      return false
    }
  }

  function checkContents() {
    if (model.board.selectedSquare) {
      if (model.board.letters[model.board.selectedSquare.row][model.board.selectedSquare.column].length < 6) {
        return true
      }
      return false
    }
  }

  function calculateScore() {
    model.score = 0
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // if a square has at least 2 letters
        if (model.board.letters[i][j].length > 1) {
          for (let k = 0; k < 5; k++) {
            // check if they are a substring of any word in the solution
            if (model.words[k].includes(model.board.letters[i][j])) {
              model.score += model.board.letters[i][j].length
            }
          }
        }
      }
    }
    return model.score
  }


  function validateSolution() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        // if the square is not empty
        if (model.board.letters[i][j] != '') {
          if (model.words.includes(model.board.letters[i][j])) {
            continue
          }
          else {
            return false
          }
        }
      }
    }
    return true
  }

  // controller(s)
  // -----------------------------------------------

  function handleClick(row: number, column: number) {
    if (hasContents(row, column)) {
      // set the selectedSquare value in model.board to the coordinates that were clicked
      selectSquare(row, column)

      andRefreshDisplay()
    }
    else {
      alert("Cannot select an empty square")
    }
  }

  document.addEventListener('keydown', (e) => {
    if (checkSelected() && !e.repeat) {     //only listen if a square is selected
      switch (e.code) {
        case 'ArrowUp':
          moveContents("up");
          break;
        case 'ArrowDown':
          moveContents("down");
          break;
        case 'ArrowLeft':
          moveContents("left");
          break;
        case 'ArrowRight':
          moveContents("right");
          break;
      }
    }
   
  })

  document.addEventListener('keyup', (e)=> { 

  })


  // function for an arrow click
  function arrowClick(direction: string) {
      moveContents(direction)
  }


  // 
  function selectSquare(row: number, column: number) {
    // if there is already a selectedSquare
    if (model.board.selectedSquare != undefined) {
      model.board.selectedSquare = undefined
    }
    // else there isn't a selected square
    else {
      model.board.selectedSquare = new Coordinate(row, column);
      console.log(model.board.selectedSquare)
    }
  }


  function moveContents(direction: string) {
    let selected = model.board.selectedSquare;

    if (selected) {
      let sr = selected.row
      let sc = selected.column

      // if a square has been selected and the move is valid
      // And the selected square has less than 6 letters
      if (checkSelected() && moveIsValid(direction) && checkContents()) {
        if (direction == "up") {
          // prepend contents
          model.board.letters[sr - 1][sc] = model.board.letters[sr][sc] + model.board.letters[sr - 1][sc]
          //model.board.selectedSquare = new Coordinate(selected.row - 1, selected.column)
        }
        else if (direction == "down") {
          // prepend contents
          model.board.letters[sr + 1][sc] = model.board.letters[sr][sc] + model.board.letters[sr + 1][sc]
          //model.board.selectedSquare = new Coordinate(selected.row + 1, selected.column)
        }
        else if (direction == "left") {
          // prepend contents
          model.board.letters[sr][sc - 1] = model.board.letters[sr][sc] + model.board.letters[sr][sc - 1]
          //model.board.selectedSquare = new Coordinate(selected.row, selected.column - 1)
        }
        else if (direction == "right") {
          // prepend contents
          model.board.letters[sr][sc + 1] = model.board.letters[sr][sc] + model.board.letters[sr][sc + 1]
          //model.board.selectedSquare = new Coordinate(selected.row, selected.column + 1)
        }

        // remove content from square that is moving
        model.board.letters[sr][sc] = ""
        model.board.selectedSquare = undefined;
        model.numMoves++
        andRefreshDisplay()

      }
      else {
        console.log("Did not move square")
      }
    }
  }

  function chooseConfig(which: number) {
    setModel(new Model(which))
  }

  function resetPuzzle() {
    setModel(new Model(model.chosen))
    model.numMoves = 0
  }

  function checkSolution() {
    let answer = validateSolution()
    if (answer) {
      alert("Puzzle is Correct!")
    }
    else {
      alert("Puzzle is Not Correct.")
      resetPuzzle()
    }
  }


  // change the style for the given square based on model. Space separated string.
  // So "square" is a regular square, while "square selected" is a selected square. Find
  // these CSS definitions inside the global.css file
  function css(row: number, column: number) {

    let selectedRow = model.board.selectedSquare?.row
    let selectedCol = model.board.selectedSquare?.column

    if (row == selectedRow && column == selectedCol) {
      return "square selected"
    }
    return "square"
  }

  return (
    <div>
      <div className="board">
        <div className="button-container">
          <button data-testid="0,0" className={css(0, 0)} onClick={() => handleClick(0, 0)}>{model.contents(0, 0)}</button>
          <button data-testid="0,1" className={css(0, 1)} onClick={() => handleClick(0, 1)}>{model.contents(0, 1)}</button>
          <button data-testid="0,2" className={css(0, 2)} onClick={() => handleClick(0, 2)}>{model.contents(0, 2)}</button>
          <button data-testid="0,3" className={css(0, 3)} onClick={() => handleClick(0, 3)}>{model.contents(0, 3)}</button>
          <button data-testid="0,4" className={css(0, 4)} onClick={() => handleClick(0, 4)}>{model.contents(0, 4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="1,0" className={css(1, 0)} onClick={() => handleClick(1, 0)}>{model.contents(1, 0)}</button>
          <button data-testid="1,1" className={css(1, 1)} onClick={() => handleClick(1, 1)}>{model.contents(1, 1)}</button>
          <button data-testid="1,2" className={css(1, 2)} onClick={() => handleClick(1, 2)}>{model.contents(1, 2)}</button>
          <button data-testid="1,3" className={css(1, 3)} onClick={() => handleClick(1, 3)}>{model.contents(1, 3)}</button>
          <button data-testid="1,4" className={css(1, 4)} onClick={() => handleClick(1, 4)}>{model.contents(1, 4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="2,0" className={css(2, 0)} onClick={() => handleClick(2, 0)}>{model.contents(2, 0)}</button>
          <button data-testid="2,1" className={css(2, 1)} onClick={() => handleClick(2, 1)}>{model.contents(2, 1)}</button>
          <button data-testid="2,2" className={css(2, 2)} onClick={() => handleClick(2, 2)}>{model.contents(2, 2)}</button>
          <button data-testid="2,3" className={css(2, 3)} onClick={() => handleClick(2, 3)}>{model.contents(2, 3)}</button>
          <button data-testid="2,4" className={css(2, 4)} onClick={() => handleClick(2, 4)}>{model.contents(2, 4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="3,0" className={css(3, 0)} onClick={() => handleClick(3, 0)}>{model.contents(3, 0)}</button>
          <button data-testid="3,1" className={css(3, 1)} onClick={() => handleClick(3, 1)}>{model.contents(3, 1)}</button>
          <button data-testid="3,2" className={css(3, 2)} onClick={() => handleClick(3, 2)}>{model.contents(3, 2)}</button>
          <button data-testid="3,3" className={css(3, 3)} onClick={() => handleClick(3, 3)}>{model.contents(3, 3)}</button>
          <button data-testid="3,4" className={css(3, 4)} onClick={() => handleClick(3, 4)}>{model.contents(3, 4)}</button>
        </div>
        <div className="button-container">
          <button data-testid="4,0" className={css(4, 0)} onClick={() => handleClick(4, 0)}>{model.contents(4, 0)}</button>
          <button data-testid="4,1" className={css(4, 1)} onClick={() => handleClick(4, 1)}>{model.contents(4, 1)}</button>
          <button data-testid="4,2" className={css(4, 2)} onClick={() => handleClick(4, 2)}>{model.contents(4, 2)}</button>
          <button data-testid="4,3" className={css(4, 3)} onClick={() => handleClick(4, 3)}>{model.contents(4, 3)}</button>
          <button data-testid="4,4" className={css(4, 4)} onClick={() => handleClick(4, 4)}>{model.contents(4, 4)}</button>
        </div>
      </div>
      <div>
        <div className="arrow-keys">
          <button data-testid="leftButton" className="button left-button" onClick={() => arrowClick("left")}>&#8592;</button>
          <button data-testid="upButton" className="button up-button" onClick={() => arrowClick("up")}>&#8593;</button>
          <button data-testid="rightButton" className="button right-button" onClick={() => arrowClick("right")}>&#8594;</button>
          <button data-testid="downButton" className="button down-button" onClick={() => arrowClick("down")}>&#8595;</button>
        </div>
      </div>
      <div>
        <div className="config-buttons">
          <button data-testid="config1" className="config-1" onClick={() => chooseConfig(0)}>1</button>
          <button data-testid="config2" className="config-2" onClick={() => chooseConfig(1)}>2</button>
          <button data-testid="config3" className="config-3" onClick={() => chooseConfig(2)}>3</button>
        </div>
      </div>
      <label className='config'>Configuration:</label>
      <label className="score">Score: {calculateScore()}</label>
      <label className="numMoves">{"Number of Moves: " + model.numMoves}</label>
      <button data-testid="checkSolutionId" className="checkSolution" onClick={() => checkSolution()}>Check Solution</button>
      <button data-testid="resetPuzzleId" className="resetPuzzle" onClick={() => resetPuzzle()}>Reset Puzzle</button>
    </div>
  )
}
