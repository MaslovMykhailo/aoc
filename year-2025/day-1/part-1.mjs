import fs from 'fs';
import url from 'url';
import path from 'path';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const inputFilePath = path.join(__dirname, 'input.txt');

export function readFileInput(filename) {
    return fs.readFileSync(filename, 'utf8').trim();
}

export const exampleInput = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim()

export const parseInput = input => input
    .split('\n')
    .map(line => line.split(''))
    .map(([direction, ...steps]) => ({
        direction, 
        steps: Number(steps.join('')),
    }))

export const MIN_POSITION = 0;
export const MAX_POSITION = 99;

export const makeMove = ({direction, steps}, position) => {
    const diff = direction === 'L' ? -1 : 1;
    const next = (position + diff * steps) % (MAX_POSITION + 1);

    if (next < MIN_POSITION) {
        return next + MAX_POSITION + 1;
    }

    if (next > MAX_POSITION) {
        return next - MAX_POSITION - 1;
    }

    return next;
}

const solve = input => {
    const moves = parseInput(input)

    const TARGET_POSITION = 0;
    let countOfReachedTarget = 0 

    let position = 50;   

    for (const move of moves) {
        position = makeMove(move, position);

        if (position === TARGET_POSITION) {
            countOfReachedTarget++;
        }
    }

    return countOfReachedTarget;
}

// console.log(solve(readFileInput(inputFilePath)))

