import { defineSolution } from 'aoc-kit'

import { buildKey, parseKey } from './part-1.mjs'

const parseInput = input => input
  .split('\n')
  .map(
    line => line
      .split('')
      .map(s => s === '.' ? 1 : 0)
  )

const EXPANDER = 999999

const expandGalaxy = galaxy => {
  const ym = Array(galaxy.length).fill(null).map((_, i) => i)
  const xm = Array(galaxy[0].length).fill(null).map((_, i) => i)

  const yExpand = []

  for (let y = 0; y < ym.length; y++) {
    if (xm.every(x => galaxy[y][x] === 1)) {
      yExpand.push(y)
    }
  }

  const xExpand = []

  for (let x = 0; x < xm.length; x++) {
    if (ym.every(y => galaxy[y][x] === 1)) {
      xExpand.push(x)
    }
  }

  return Array(ym.length)
    .fill(null)
    .map((_, i) => i)
    .map(
      y => Array(xm.length)
        .fill(null)
        .map((_, i) => i)
        .map(x => {
          if (yExpand.includes(y) || xExpand.includes(x)) {
            return galaxy[y][x] + EXPANDER
          }

          return galaxy[y][x]
        })
    )
}

const findStars = galaxy => {
  const stars = new Set()
  
  for (let y = 0; y < galaxy.length; y++) {
    for (let x = 0; x < galaxy[y].length; x++) {
      if (galaxy[y][x] === 0) {
        stars.add(buildKey({x, y}))
      }
    }
  }

  return stars
}

const countDistanceBetweenStars = galaxy => (star1, star2) => {
  const [s1, s2] = [star1, star2].map(parseKey)

  let distance = 0

  const dx = s1.x < s2.x ? 1 : -1
  for (let x = s1.x; x != s2.x; x += dx) {
    distance += (galaxy[s1.y][x] || 1)
  }

  const dy = s1.y < s2.y ? 1 : -1
  for (let y = s1.y; y != s2.y; y += dy) {
    distance += (galaxy[y][s2.x] || 1)
  }

  return distance
} 

const buildStarPairsGetter = stars => star => 
  Array.from(stars).filter(s => s !== star)


const countDistances = (galaxy, stars) => {
  const getStarPairs = buildStarPairsGetter(stars)
  const countDistance = countDistanceBetweenStars(galaxy)

  return Array.from(stars).reduce(
    (distances, star) => getStarPairs(star)
      .reduce(
        (d, starPair) => d + countDistance(star, starPair),
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
      expandedGalaxy,
      findStars(expandedGalaxy)
    )
  )
}, {})
