import { defineSolution } from 'aoc-kit';

const isNumber = (s) => /\d/.test(s)

const isStar = (s) => s === '*'

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

const findStarAdjacentNumberPartCoordinates = (em, [x, y], [xl, yl]) => 
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

const findEngineGearPartNumbers = (em) => {
  const numbers = []

  const yl = em.length
  for (let y = 0; y < yl; y++) {
    const xl = em[y].length
    for (let x = 0; x < xl; x++) {
      if (!isStar(em[y][x])) continue

      const cs = findStarAdjacentNumberPartCoordinates(
        em,
        [x, y],
        [xl, yl]
      )

      if (cs.length < 2) {
        continue
      }

      const nums = buildNumberParts(em, cs, [xl, yl])

      if (nums.length != 2) {
        continue
      }

      const [n1, n2] = nums
      numbers.push(n1 * n2)
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
  const nums = findEngineGearPartNumbers(em)
  solve(sum(nums))
}, {})