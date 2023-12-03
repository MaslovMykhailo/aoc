import { defineSolution } from 'aoc-kit';

const isCharNumber = (char) => /\d/.test(char)

const findCalibrationValue = (line) => {
  const chars = line.split('');
  const n1 = chars.find(isCharNumber)
  const n2 = chars.findLast(isCharNumber)
  return Number(n1 + n2)
} 

const sum = (nums) => nums.reduce((s, n) => s + n, 0)

export default defineSolution((input, solve) => {
  const lines = input.split('\n')
  const calibrated = lines.map(findCalibrationValue)
  solve(sum(calibrated))
}, {})