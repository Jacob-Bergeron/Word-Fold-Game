import { expect, test } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'

import React from 'react'
import Home from './page'

// to write this kind of test, we need to be able to render canvas, so we need 
// to simply run (once) npm install canvas. Tricky for GUI but these have to 
// be async functions that are cleaned up afterwards. Only for REACT gui
test('Home', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...

  getByText(/Score: 0/i)

  const b00 = getByTestId('0,0')
  expect(b00.textContent).toBe("E")

  const b10 = getByTestId("1,0")
  expect(b10.textContent).toBe("Y")


  cleanup()
})

test('Move', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...

  getByText(/Score: 0/i)

  const b10 = getByTestId("1,0")
  const buttonUp = getByTestId("upButton")

  fireEvent.click(b10)
  fireEvent.click(buttonUp)

  getByText(/Score: 2/i)

  cleanup()
})

test('Reset', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...

  const b10 = getByTestId("1,0")
  const buttonUp = getByTestId("upButton")

  const rp = getByTestId("resetPuzzleId")

  fireEvent.click(b10)
  fireEvent.click(buttonUp)

  getByText(/Score: 2/i)
  fireEvent.click(rp)

  getByText(/Score: 0/i)

  cleanup()
})

test('chooseConfig', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...

  const cf2 = getByTestId("config2")
  fireEvent.click(cf2)

  const b10 = getByTestId('1,0')
  expect(b10.textContent).toBe("A")


  const cf3 = getByTestId("config3")
  fireEvent.click(cf3)

  const b00 = getByTestId('0,0')
  expect(b00.textContent).toBe("H")

  cleanup()
})

test('checkSolution', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...

  const b00 = getByTestId('0,0')
  const b10 = getByTestId('1,0')
  const b20 = getByTestId('2,0')

  const up = getByTestId("upButton")

  const check = getByTestId("checkSolutionId")

  fireEvent.click(b20)
  fireEvent.click(up)
  fireEvent.click(b10)
  fireEvent.click(up)
  fireEvent.click(b00)
  fireEvent.click(up)
  fireEvent.click(check)

  getByText(/Score: 0/i)

  cleanup()
})

test('invalidMove', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...


  getByText(/Score: 0/i)

  const b00 = getByTestId("0,0")
  const buttonUp = getByTestId("upButton")

  fireEvent.click(b00)
  fireEvent.click(buttonUp)

  getByText(/Score: 0/i)

  cleanup()
})

test('MoveMultiple', async () => {
  const { getByText, getByTestId } = render(<Home />)
  const scoresElement = getByText(/Score:/i);     // scrape text that should be there...

  getByText(/Score: 0/i)

  const b21 = getByTestId("2,1")
  const b20 = getByTestId("2,0")

  const buttonDown = getByTestId("downButton")

  fireEvent.click(b21)
  fireEvent.click(buttonDown)

  fireEvent.click(b20)
  fireEvent.click(buttonDown)

  getByText(/Score: 4/i)

  cleanup()
})




