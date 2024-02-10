import { defineSolution } from 'aoc-kit'

const NODE_REGEXP = /(?<element>[A-Z]+) = \((?<L>[A-Z]+), (?<R>[A-Z]+)\)/

const parseNode = (input) => input.match(NODE_REGEXP).groups

export const parseInput = (input) => {
  const [instruction, _, ...nodes] = input.split('\n')
  const steps = instruction.split('')
  const graph = buildGraph(nodes.map(parseNode))
  return {steps, graph}
}

const findStepsCount = (graph, steps) => {
  let count = 0
  let node = graph.get('AAA')

  do {
    const step = steps[count % steps.length]
    node = node[step]
    count++
  } while (node.element !== 'ZZZ')

  return count
}

export default defineSolution((input, solve) => {
  const {graph, steps} = parseInput(input)
  const count = findStepsCount(graph, steps)
  solve(count)
}, {})

function buildGraph(nodes) {
  const graph = new Map()

  const getNode = (element) => {
    if (!graph.has(element)) {
      graph.set(element, new Node(element))
    } 
    return graph.get(element)
  }

  for (const {element, L, R} of nodes) {
    const node = getNode(element)
    node.L = getNode(L)
    node.R = getNode(R)
  }

  return graph
}

class Node {
  constructor(element) {
    this.element = element
  }

  get L() {
    return this.left
  }

  set L(left) {
    this.left = left
  }

  get R() {
    return this.right
  }

  set R(right) {
    this.right = right
  }
}