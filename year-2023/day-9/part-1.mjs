import { defineSolution } from 'aoc-kit'

export const parseInput = (input) => input
  .split('\n')
  .map(s => s.split(' ').map(Number))

export const first = (array) => array[0]
export const last = (array) => array[array.length - 1]
export const someNoneZero = (layer) => layer.some(v => v !== 0)

export const extrapolateLayer = (history) => {
  return history.reduce(
    (layer, v, index) => {
      if (index !== history.length - 1) {
        const nv = history[index + 1]
        layer.push(nv - v)
      }
      return layer
    },
    []
  )
}

const extrapolate = (history) => {
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
        layer.push(0)
        return layer
      }

      const diff = last(prevLayer)
      const lastValue = last(layer)
      layer.push(lastValue + diff)

      return layer
    }
  )
}

const sumExtrapolated = (histories) => histories
  .reduce(
    (sum, history) => sum + last(extrapolate(history)),
    0
  )

export default defineSolution((input, solve) => {
  const histories = parseInput(input)
  solve(sumExtrapolated(histories))
}, {})
