import { defineSolution } from 'aoc-kit';
  
const CARD_REGEX = /^Card ?\s+\d+: (?<numbers>.+)$/

const parseInput = (input) => {
  const cards = input.split('\n')
  return cards.map(
    (card) => {
      const numbers = card
        .match(CARD_REGEX)
        .groups
        .numbers

      const [winning, existed] = numbers.split(' | ').map(
        (line) => line.split(' ').filter(s => s.length > 0).map(Number)
      )
      
      
      return {
        winning,
        existed
      }
    }
  )
}

const countWins = ({winning, existed}) => {
  const winned = new Set(winning)

  return existed.reduce(
    (result, n) => {
      if (!winned.has(n)) {
        return result
      }

      return result === 0 ? 1 : result * 2;
    },
    0
  )
}

const sum = (nums) => nums.reduce((s, n) => s + n, 0)

export default defineSolution((input, solve) => {
  const parsed = parseInput(input)
  const wins = parsed.map(countWins)
  solve(sum(wins))
}, {})