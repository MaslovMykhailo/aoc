import { defineSolution } from 'aoc-kit'

import {
  parseInput,
  findStartingPoint, 
  createNextPointsGetter, 
  serializePoint, 
  filterVisited, 
  isPointOutOfMaze,
  isLoop
} from './part-1.mjs'

const findLoop = maze => {
  const loop = new Map()
  const addLoopPoint = (p) => loop.set(serializePoint(p), p)

  const startingPoint = findStartingPoint(maze)
  const getNextPoints = createNextPointsGetter(maze)

  let points = getNextPoints(startingPoint).filter(
    (point) => getNextPoints(point)
      .map(serializePoint)
      .includes(serializePoint(startingPoint))
  )
  let visited =  Array(points.length)
    .fill(serializePoint(startingPoint))

  addLoopPoint(startingPoint)
  points.forEach(addLoopPoint)
  
  do {
      const nextPoints = filterVisited(
        points.map(getNextPoints),
        visited
      ) 

      visited = points.map(serializePoint)
      points = nextPoints

      points.forEach(addLoopPoint)
  } while (!isLoop(points))

  return loop
}

const getNeighborPoints = ({x, y}) => [
  {x: x - 1, y},
  {x: x + 1, y},
  {x, y: y - 1},
  {x, y: y + 1}
]

const isPointEnclosedInLoop = (point, maze, loop, pointsOutOfLoop) => {
  let neighborPoints = [point]
  const visited = new Set(serializePoint(point))
  do {
    if (
      neighborPoints.some(isPointOutOfMaze(maze)) || 
      neighborPoints.map(serializePoint).some(p => pointsOutOfLoop.has(p))
    ) {
      return false
    }

    neighborPoints.forEach(p => visited.add(serializePoint(p)))
    neighborPoints = Array.from(
      neighborPoints
        .flatMap(getNeighborPoints)
        .reduce(
          (map, p) => {
            map.set(serializePoint(p), p)
            return map
          },
          new Map()
        )
        .values()
      )
      .filter(p => {
        const sp = serializePoint(p)
        return !loop.has(sp) && !visited.has(sp)
      })
  } while (neighborPoints.length > 0)

  return true
}

const countPointsEnclosedInLoop = (maze, loop) => {
  const pointsInLoop = new Map()
  const pointsOutOfLoop = new Set()

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const point = {x, y}

      if (loop.has(serializePoint(point))) {
        continue
      }

      if (isPointEnclosedInLoop(point, maze, loop, pointsOutOfLoop)) {
        pointsInLoop.set(serializePoint(point), point)
      } else {
        pointsOutOfLoop.add(serializePoint(point))
      }
    }
  }

  return pointsInLoop.size
}


export default defineSolution((input, solve) => {
  const maze = parseInput(input)
  solve(countPointsEnclosedInLoop(maze, findLoop(maze)))
}, {})
