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

const countWins = ({winning, existed, m = 0}, i, cards) => {
  const winned = new Set(winning)
  const winsAmount = existed.reduce(
    (r, n) => r + Number(winned.has(n)),
    0
  );

  m++;

  for (let j = i + 1; j <= i + winsAmount; j++) {
    cards[j] = {
      ...cards[j],
      m: (cards[j].m || 0) + m,
    }
  }

  return {
    ...cards[i],
    w: m
  }
}

const sum = (nums) => nums.reduce((s, n) => s + n, 0)

export default defineSolution((input, solve) => {
  const parsed = parseInput(input)
  const wins = parsed.map(countWins).map(({w}) => w)
  solve(sum(wins))
}, {})