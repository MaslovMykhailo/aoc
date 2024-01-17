import { defineSolution } from 'aoc-kit';

import {
  TIME_REGEX, 
  DISTANCE_REGEX, 
  findAmountOfBetterDistances
} from './part-1.mjs'

const filterSpaces = (str) => str.replace(/\s/g, '') 

const parseNumber = (n) => Number(filterSpaces(n)) 

const parseInput = (input) => {
  const [rawTimes, rawDistances] = input.split('\n')
  const time = parseNumber(rawTimes.match(TIME_REGEX)[1])
  const distance = parseNumber(rawDistances.match(DISTANCE_REGEX)[1])
  return [time, distance]
}

export default defineSolution((input, solve) => {
  const parsed = parseInput(input)
  solve(findAmountOfBetterDistances(parsed))
}, {})
