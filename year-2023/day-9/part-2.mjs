import { defineSolution } from 'aoc-kit'

import {
  parseInput, 
  first,
  someNoneZero,
  extrapolateLayer
} from './part-1.mjs'

const extrapolateBackward = (history) => {
  const layers = [history]
  let lastLayer = history
  
  do {
    const nextLayer = extrapolateLayer(lastLayer)
    layers.push(nextLayer)
    lastLayer = nextLayer
  } while (someNoneZero(lastLayer))

  return layers.reverse().reduce(
    (prevLayer, layer) => {
      if (layer === prevLayer) {
        layer.unshift(0)
        return layer
      }

      const diff = first(prevLayer)
      const firstValue = first(layer)
      layer.unshift(firstValue - diff)

      return layer
    }
  )
}

const sumExtrapolatedBackward = (histories) => histories
  .reduce(
    (sum, history) => sum + first(extrapolateBackward(history)),
    0
  )

export default defineSolution((input, solve) => {
  const histories = parseInput(input)
  solve(sumExtrapolatedBackward(histories))
}, {})
