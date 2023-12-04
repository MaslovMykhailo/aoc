import { defineSolution } from 'aoc-kit';

const limits = Object.entries({
  red: 12,
  green: 13,
  blue: 14
})

const isPossibleCubeSet = (cubeSets) => 
  cubeSets.every(
    (cubeSet) => limits.every(
      ([color, limit]) => (cubeSet[color] || 0) <= limit
    )
  )
  

const GAME_REGEX = /^Game \d+: (?<sets>.+)$/
const CUBE_REGEX = /(?<count>\d+) (?<color>\w+)/

const parseInput = (input) => {
  const games = input.split('\n')
  return games.reduce(
    (parsed, game) => {
      const sets = game
        .match(GAME_REGEX)
        .groups
        .sets
        .split(';')

      const cubes = sets.map(
        (set) => set.split(',').reduce(
          (cube, part) => {
            const {color, count} = part.match(CUBE_REGEX).groups
            cube[color] = Number(count)
            return cube
          }, 
          {}
        )
      )

      parsed.push(cubes) 
      return parsed
    },
    []
  )
}

export default defineSolution((input, solve) => {
  const cubes = parseInput(input)
  const sumOfPossibleIndexes = cubes.reduce(
    (sum, cube, i) => isPossibleCubeSet(cube) ? sum + i + 1 : sum,
    0
  )
  solve(sumOfPossibleIndexes)
}, {})