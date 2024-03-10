import { defineSolution } from 'aoc-kit'

const parseInput = input => input
  .split('\n')
  .map(line => line.split(''))

export const buildKey = ({x, y}) => `${x}|${y}`
export const parseKey = key => {
  const [x, y] = key.split('|').map(Number)
  return {x, y}
}

const expandGalaxy = galaxy => {
  const ym = Array(galaxy.length).fill(null).map((_, i) => i)
  const xm = Array(galaxy[0].length).fill(null).map((_, i) => i)

  const yExpand = []

  for (let y = 0; y < ym.length; y++) {
    if (xm.every(x => galaxy[y][x] === '.')) {
      yExpand.push(y + yExpand.length)
    }
  }

  const xExpand = []

  for (let x = 0; x < xm.length; x++) {
    if (ym.every(y => galaxy[y][x] === '.')) {
      xExpand.push(x + xExpand.length)
    }
  }

  return Array(ym.length + yExpand.length)
    .fill(null)
    .map((_, i) => i)
    .map(
      y => Array(xm.length + xExpand.length)
        .fill(null)
        .map((_, i) => i)
        .map(x => {
          if (yExpand.includes(y) || xExpand.includes(x)) {
            return '.'
          }

          const dy = yExpand.filter(n => n < y).length
          const dx = xExpand.filter(n => n < x).length

          return galaxy[y - dy][x - dx]
        })
    )
}

const findStars = galaxy => {
  const stars = new Set()
  
  for (let y = 0; y < galaxy.length; y++) {
    for (let x = 0; x < galaxy[y].length; x++) {
      if (galaxy[y][x] === '#') {
        stars.add(buildKey({x, y}))
      }
    }
  }

  return stars
}

const buildStarPairsGetter = stars => star => 
  Array.from(stars).filter(s => s !== star)

const countDistanceBetweenStars = (star1, star2) => {
  const [s1, s2] = [star1, star2].map(parseKey)
  return Math.abs(s1.x - s2.x) + Math.abs(s1.y - s2.y)
}

const countDistances = (stars) => {
  const getStarPairs = buildStarPairsGetter(stars)
  return Array.from(stars).reduce(
    (distances, star) => getStarPairs(star)
      .reduce(
        (d, starPair) => d + countDistanceBetweenStars(star, starPair),
        distances
      ),
    0
  ) / 2
}

export default defineSolution((input, solve) => {
  const galaxy = parseInput(input)
  const expandedGalaxy = expandGalaxy(galaxy)
  solve(
    countDistances(
      findStars(
        expandedGalaxy
      )
    )
  )
}, {})
