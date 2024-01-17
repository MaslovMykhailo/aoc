import { defineSolution } from 'aoc-kit';

export const TIME_REGEX = /^Time: (.+)/
export const DISTANCE_REGEX = /^Distance: (.+)/

const parseNumberList = (list) => list
  .split(' ')
  .filter((n) => n.length)
  .map(Number)

const parseInput = (input) => {
  const [rawTimes, rawDistances] = input.split('\n')
  return {
    times: parseNumberList(rawTimes.match(TIME_REGEX)[1]),
    distances: parseNumberList(rawDistances.match(DISTANCE_REGEX)[1])
  }
}

const toTuples = (arr1, arr2) => {
  const length = Math.max(arr1.length, arr2.length)
  return Array(length).fill(null).map((_, i) => [arr1[i], arr2[i]]);
} 

const calcDistance = (speed, time) => speed * time

export const findAmountOfBetterDistances = ([totalTime, bestDistance]) => {
  let lowerTime = -1
  let higherTime = -1

  for (let i = 1; i < totalTime - 1; i++) {
    if (lowerTime > 0 && higherTime > 0) {
      return higherTime - lowerTime + 1
    }

    if (lowerTime < 0) {
      const speed = i
      const distances = calcDistance(speed, totalTime - speed)

      if (distances > bestDistance) {
        lowerTime = speed
      }
    }

    if (higherTime < 0) {
      const speed = totalTime - i
      const distances = calcDistance(speed, totalTime - speed)

      if (distances > bestDistance) {
        higherTime = speed
      }
    }
  }
}

export default defineSolution((input, solve) => {
  const {times, distances} = parseInput(input)
  const countOfBetterWays = toTuples(times, distances)
    .map(findAmountOfBetterDistances)
    .reduce((a, n) => a * n, 1)
  solve(countOfBetterWays)
}, {})
