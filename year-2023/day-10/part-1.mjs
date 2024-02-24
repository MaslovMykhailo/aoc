import { defineSolution } from 'aoc-kit'

export const parseInput = input => input
  .split('\n')
  .map(line => line.split(''))

export const findStartingPoint = maze => {
  const y = maze.findIndex((line) => line.includes('S'))
  const x = maze[y].indexOf('S')
  return {x, y}
} 

const PIPE_MAP = {
  'S': [{dx: -1, dy: 0}, {dx: 0, dy: 1}, {dx: 1, dy: 0}, {dx: 0, dy: -1}],
  '.': [],
  '|': [{dx: 0, dy: 1}, {dx: 0, dy: -1}],
  '-': [{dx: 1, dy: 0}, {dx: -1, dy: 0}],
  'L': [{dx: 0, dy: -1}, {dx: 1, dy: 0}],
  'J': [{dx: 0, dy: -1}, {dx: -1, dy: 0}],
  '7': [{dx: -1, dy: 0}, {dx: 0, dy: 1}],
  'F': [{dx: 1, dy: 0}, {dx: 0, dy: 1}],
}

export const serializePoint = ({x, y}) => `${x}|${y}`

export const isPointInMaze = maze => ({x, y}) => 
  y >= 0 && y < maze.length && x >= 0 && x < maze[y].length

export const isPointOutOfMaze = maze => point => 
  !isPointInMaze(maze)(point)

export const createNextPointsGetter = maze => ({x, y}) => {
  const movements = PIPE_MAP[maze[y][x]]
  return movements
    .map(({dx, dy}) => ({x: x + dx, y: y + dy}))
    .filter(isPointInMaze(maze))
}

export const filterVisited = (points2d, visited) => points2d
  .flatMap((points, index) => {
    const visitedPoint = visited[index]
    return points.filter(
      point => serializePoint(point) !== visitedPoint
    )
  })

export const isLoop = points => 
  new Set(points.map(serializePoint)).size === 1

const findFarthestPoint = maze => {
  const startingPoint = findStartingPoint(maze)
  const getNextPoints = createNextPointsGetter(maze)

  let steps = 1
  let points = getNextPoints(startingPoint).filter(
    (point) => getNextPoints(point)
      .map(serializePoint)
      .includes(serializePoint(startingPoint))
  )
  let visited =  Array(points.length)
    .fill(serializePoint(startingPoint))
  
  do {
      const nextPoints = filterVisited(
        points.map(getNextPoints),
        visited
      ) 

      visited = points.map(serializePoint)
      points = nextPoints

      steps++
  } while (!isLoop(points))

  return steps
}

export default defineSolution((input, solve) => {
  const maze = parseInput(input)
  solve(findFarthestPoint(maze))
}, {})
