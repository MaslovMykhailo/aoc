import { defineSolution } from 'aoc-kit';

export const parseSeeds = (rawSeeds) => rawSeeds
  .replace('seeds: ', '')
  .split(' ')
  .map(Number) 

export const parseChain = (rawChain) => {
  const HEADER_REGEX = /(\w+)-(\w+) map:/
  const isHeader = (rawPiece) => HEADER_REGEX.test(rawPiece)
  const parsePiece = (rawPiece) => rawPiece.split(' ').map(Number)
  
  const chainStart = new ChainPiece()
  const chainEnd = rawChain
    .flatMap((rawParts) => rawParts.split('\n'))
    .slice(1)
    .reduce(
      (piece, rawPiece) => {
        if (isHeader(rawPiece)) {
          return piece.next = new ChainPiece()
        }

        return piece.add(...parsePiece(rawPiece))
      },
      chainStart
  )
  return {chainStart, chainEnd}
}

const parseInput = (input) => {
  const [rawSeeds, ...rawChain] = input.split('\n\n')
  const seeds = parseSeeds(rawSeeds)
  const {chainStart: chain} = parseChain(rawChain)
  return {seeds, chain}
}

export const buildDirectChain = (nFrom, chain) => {
  let nTo = nFrom
  let piece = chain

  do {
    nTo = piece.getRelated(nTo)
    piece = piece.next
  } while (piece)

  return [nFrom, nTo]
}

export const buildDirectMap = (seeds, chain) => Object.fromEntries(
  seeds.map((seed) => buildDirectChain(seed, chain))
)

export const getLowest = (map) => Math.min(...Object.values(map))

export default defineSolution((input, solve) => {
  const {seeds, chain} = parseInput(input)
  const directMap = buildDirectMap(seeds, chain)
  solve(getLowest(directMap))
}, {})

class ChainPiece {
  constructor() {
    this.parts = []
  }

  add(to, from, length) {
    this.parts.push(
      new ChainPiecePart(to, from, length)
    )
    return this
  }

  getRelated(n) {
    const part = this.parts.find(
      (piecePart) => piecePart.isPart(n)
    )

    if (!part) {
      return n
    }

    return part.getRelated(n)
  }

  set next(piece) {
    this.piece = piece
  }

  get next() {
    return this.piece
  }
}

class ChainPiecePart {
  constructor(to, from, length) {
    this.related = to
    this.min = from
    this.max = from + length
  }

  isPart(n) {
    return n >= this.min && n < this.max
  }

  getRelated(n) {
    return this.related + n - this.min  
  }
}
