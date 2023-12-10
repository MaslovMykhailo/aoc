import { defineSolution } from 'aoc-kit';

const isDot = (s) => s === '.'

const isNumber = (s) => /\d/.test(s)

const isSymbol = (s) => !isDot(s) && !isNumber(s)

const adjacentCoordinates = [
  [-1, -1], [ 0, -1], [ 1, -1],
  [-1,  0],         , [ 1,  0],
  [-1,  1], [ 0,  1], [ 1,  1],
]

const isExistedCoordinate = (
  [x, y],
  [xl, yl]
) => x >= 0 && x < xl && y >= 0 && y < yl;

const getAdjacentCoordinates = ([x, y], [xl, yl]) => adjacentCoordinates
  .map(([dx, dy]) => [x + dx, y + dy])
  .filter(([xc, yc]) => isExistedCoordinate([xc, yc], [xl, yl]))

const findSymbolAdjacentNumberPartCoordinates = (em, [x, y], [xl, yl]) => 
  getAdjacentCoordinates([x, y], [xl, yl])
    .filter(([xc, yc]) => isNumber(em[yc][xc]))

const buildNumberPart = (em, [x, y], [xl, yl]) => {
  let n = ''

  let xMin = x
  while (
    isExistedCoordinate([xMin, y], [xl, yl]) && 
    isNumber(em[y][xMin])
  ) {
    xMin--
  }
  xMin++
  

  let xMax = xMin
  while (
    isExistedCoordinate([xMax, y], [xl, yl]) && 
    isNumber(em[y][xMax])
  ) {
    n = n + em[y][xMax]
    xMax++
  }
  xMax--

  return {
    n: Number(n),
    c: {
      xMin,
      xMax,
      yc: y
    }
  }
}

const buildNumberParts = (em, cs, [xl, yl]) => {
  const numberParts = cs.reduce(
    (parts, [x, y]) => {
      if (parts.some(
        ({c: {xMin, xMax, yc}}) => {
          return y === yc && x >= xMin && x <= xMax
        }
      )) {
        return parts
      }

      const part = buildNumberPart(em, [x, y], [xl, yl]) 
      parts.push(part)
      return parts
    },
    []
  )
  return numberParts.map(({n}) => n)
} 

const findEnginePartNumbers = (em) => {
  const numbers = []

  const yl = em.length
  for (let y = 0; y < yl; y++) {
    const xl = em[y].length
    for (let x = 0; x < xl; x++) {
      if (!isSymbol(em[y][x])) continue

      const cs = findSymbolAdjacentNumberPartCoordinates(
        em,
        [x, y],
        [xl, yl]
      )

      buildNumberParts(em, cs, [xl, yl]).forEach(
        (n) => numbers.push(n)
      )
    }
  }

  return numbers
}

const parseInput = (input) => input
  .split('\n')
  .map((line) => line.split(''))

const sum = (nums) => nums.reduce((s, n) => s + n, 0)

export default defineSolution((input, solve) => {
  const em = parseInput(input)
  const nums = findEnginePartNumbers(em)
  solve(sum(nums))
}, {})