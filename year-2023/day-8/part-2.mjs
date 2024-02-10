import { defineSolution } from 'aoc-kit'

import {parseInput} from './part-1.mjs'

const findStepsCount = (graph, steps) => {
  let count = 0

  let nodes = Array.from(graph.keys())
    .filter(element => element.endsWith('A'))
    .map(element => graph.get(element))

  const distances = Array(nodes.length).fill(0)

  do {
    const step = steps[count % steps.length]
    nodes = nodes.map(node => node[step])
    count++

    nodes.forEach((node, i) => {
      if (distances[i] !== 0) return
      if (!node.element.endsWith('Z')) return
      distances[i] = count
    })
  } while (distances.some(d => d === 0))

  return distances.reduce(mcm, 1)
}

export default defineSolution((input, solve) => {
  const {graph, steps} = parseInput(input)
  const count = findStepsCount(graph, steps)
  solve(count)
}, {})

function mcd(a, b) {
  let t = 0
  while (b !== 0) {
    t = b
    b = a % b
    a = t
  }
  return a
} 

function mcm(a, b) {
  return (a * b) / mcd(a, b)
}
