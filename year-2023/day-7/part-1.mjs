import { defineSolution } from 'aoc-kit';

export const parseInput = (input) => input
  .split('\n')
  .map((line) => {
    const [hand, bid] = line.split(' ')
    return {hand, bid: Number(bid)}
  })

export const countHand = ({hand}) => hand
  .split('')
  .reduce(
    (map, card) => {
      if (!map.has(card)) {
        map.set(card, 0)
      }
      map.set(card, map.get(card) + 1)
      return map
    },
    new Map()
  )

const isFiveOfAKind = (handMap) => 
  handMap.size === 1
const isFourOfAKind = (handMap) => 
  handMap.size === 2 && Math.max(...handMap.values()) === 4
const isFullHouse = (handMap) => {
  if (handMap.size !== 2) {
    return false
  }
  return (
    Math.min(...handMap.values()) === 2 && 
    Math.max(...handMap.values()) === 3
  )
}
const isThreeOfAKind = (handMap) => 
  Math.max(...handMap.values()) === 3
const isTwoPair = (handMap) => 
  Array.from(handMap.values()).filter((v) => v === 2).length === 2
const isPair = (handMap) => 
  Math.max(...handMap.values()) === 2

const combinationPredicates = [
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isThreeOfAKind,
  isTwoPair,
  isPair,
]

export const countHandPoints = (handMap) => {
  const points = combinationPredicates.findIndex(
    predicate => predicate(handMap)
  )
  return points === -1 ? combinationPredicates.length : points
}

const CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

const compareByHighCard = (hand1, hand2, i = 0) => {
  if (i === 5) {
    return 0
  }

  const [p1, p2] = [hand1[i], hand2[i]].map(card => CARDS.indexOf(card))

  if (p1 === p2) {
    return compareByHighCard(hand1, hand2, i + 1)
  }

  return p2 - p1
}

const sortHands = (hands) => hands.slice().sort(
  (hand1, hand2) => {
    const [p1, p2] = [hand1, hand2].map(countHand).map(countHandPoints)

    if (p1 === p2) {
      return compareByHighCard(hand1.hand, hand2.hand)
    }

    return p2 - p1
  }
)

export const countTotalWinnings = (hands) => hands.reduce(
  (total, {bid}, index) => total + bid * (index + 1),
  0
)

export default defineSolution((input, solve) => {
  solve(
    countTotalWinnings(
      sortHands(
        parseInput(input)
      )
    )
  )
}, {})