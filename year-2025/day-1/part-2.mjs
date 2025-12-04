import { 
    parseInput, 
    readFileInput, 
    exampleInput,
    MIN_POSITION,
    MAX_POSITION,
    inputFilePath
} from "./part-1.mjs";

const makeMoveAndCalcPassingTarget = ({direction, steps}, position) => {
    const diff = direction === 'L' ? -1 : 1;
    let next = (position + diff * steps) % (MAX_POSITION + 1);
    let passingTargetTimes = Math.floor(Math.abs(position + (diff * steps)) / (MAX_POSITION + 1));

    if (next < MIN_POSITION) {
        next = next + MAX_POSITION + 1;

        if (position !== MIN_POSITION) {
            passingTargetTimes++;
        };
    }

    if (next > MAX_POSITION) {
        next = next - MAX_POSITION - 1;

        if (position !== MIN_POSITION) {
            passingTargetTimes++;
        };
    }

    return {
        next,
        passingTargetTimes,
    };
}

const solve = input => {
    const moves = parseInput(input)

    const TARGET_POSITION = 0;
    let countOfReachedTarget = 0 

    let position = 50;   

    for (const move of moves) {
        const {next, passingTargetTimes} = makeMoveAndCalcPassingTarget(move, position);

        position = next;
        countOfReachedTarget += passingTargetTimes;

        if (position === TARGET_POSITION) {
            countOfReachedTarget++;
        }
    }

    return countOfReachedTarget;
}

console.log(solve(exampleInput))
console.log(solve(readFileInput(inputFilePath)))

