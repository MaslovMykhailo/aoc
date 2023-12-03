import { defineSolution } from 'aoc-kit';

const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const numbersMap = numbers.reduce(
  (map, n, i) => ({...map, [n]: i + 1}), 
  Array(9)
    .fill(null)
    .map((_, i) => i + 1)
    .reduce(
      (map, n) => ({...map, [n]: n}),
      {}
    )
)

const numberRegex = new RegExp(
  `(${Object.keys(numbersMap).join('|')})`
)
const reversedNumberRegex = new RegExp(
  `(${Object.keys(numbersMap).map((n) => n.split('').reverse().join('')).join('|')})`
) 

const findCalibrationValue = (line) => {
  const [n1] = line.match(numberRegex)
  const [n2reversed] = line.split('').reverse().join('').match(reversedNumberRegex)
  const n2 = n2reversed.split('').reverse().join('')

  const v1 = numbersMap[n1].toString();
  const v2 = numbersMap[n2].toString();

  return Number(v1 + v2)
} 

const sum = (nums) => nums.reduce((s, n) => s + n, 0)

export default defineSolution((input, solve) => {
  const lines = input.split('\n')
  const calibrated = lines.map(findCalibrationValue)
  solve(sum(calibrated))
}, {})