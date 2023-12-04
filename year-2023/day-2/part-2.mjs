import { defineSolution } from 'aoc-kit';

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

const getMinCube = (cubes) => cubes.reduce(
  (min, cube) => {
    Object.entries(cube).forEach(
      ([color, count]) => {
        min[color] = Math.max(count, min[color])
      }
    )
    return min
  },
  {
    red: 0,
    green: 0,
    blue: 0
  }
)

const calcCubePower = (cube) => 
  Object.values(cube).reduce((p, c) => p * c, 1)

const sum = (nums) => nums.reduce((s, n) => s + n, 0)

export default defineSolution((input, solve) => {
  const cubes = parseInput(input)
  const cubePowers = cubes.map(getMinCube).map(calcCubePower)
  return solve(sum(cubePowers))
}, {})