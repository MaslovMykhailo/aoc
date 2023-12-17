import { defineSolution } from 'aoc-kit';

import {buildDirectChain, parseChain, getLowest} from './part-1.mjs'

const parseSeeds = (rawSeeds) => {
  const rawPairs = rawSeeds
    .replace('seeds: ', '')
    .split(' ')
    .map(Number) 

  const seeds = [];

  for (let i = 0; i < rawPairs.length; i++) {
    if (i % 2 === 0) continue
    seeds.push([rawPairs[i - 1], rawPairs[i]])
  }

  return seeds
} 

const parseInput = (input) => {
  const [rawSeeds, ...rawChain] = input.split('\n\n')
  const seeds = parseSeeds(rawSeeds)
  const {chainStart: chain} = parseChain(rawChain)
  return {seeds, chain}
}

const findShortestDirectChain = (seeds, chain) => {
  let shortest = Infinity

  for (const [seed, count] of seeds) {
    for (let i = 0; i < count; i++) {
      const [_, chained] = buildDirectChain(seed + i, chain)

      if (chained < shortest) {
        shortest = chained
      }
    }
  }

  return shortest
} 

export default defineSolution((input, solve) => {
  const {seeds, chain} = parseInput(input)
  solve(findShortestDirectChain(seeds, chain))
}, {})
