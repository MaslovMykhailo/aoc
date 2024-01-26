import { defineSolution } from 'aoc-kit';

import {parseInput, countHand, countHandPoints, countTotalWinnings} from './part-1.mjs'

const countHandPointsWithJoker = (handMap) => {
  if (!handMap.has('J')) {
    return countHandPoints(handMap)
  }

  const jCount = handMap.get('J')
  handMap.delete('J')

  if (handMap.size === 0) {
    handMap.set('A', jCount)
    return countHandPoints(handMap)
  }

  const maxCount = Math.max(...handMap.values())

  const maxKey = Array
    .from(handMap.keys())
    .find((key) => handMap.get(key) === maxCount)

  handMap.set(maxKey, handMap.get(maxKey) + jCount)
  return countHandPoints(handMap)
}

const CARDS_WITH_JOKER = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

const compareByHighCardWithJoker = (hand1, hand2, i = 0) => {
  if (i === 5) {
    return 0
  }

  const [p1, p2] = [hand1[i], hand2[i]].map(card => CARDS_WITH_JOKER.indexOf(card))

  if (p1 === p2) {
    return compareByHighCardWithJoker(hand1, hand2, i + 1)
  }

  return p2 - p1
}

const sortHands = (hands) => hands.slice().sort(
  (hand1, hand2) => {
    const [p1, p2] = [hand1, hand2].map(countHand).map(countHandPointsWithJoker)

    if (p1 === p2) {
      return compareByHighCardWithJoker(hand1.hand, hand2.hand)
    }

    return p2 - p1
  }
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