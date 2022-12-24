import {Solver, TestCase} from "../../types";

export const part1: Solver = async data => {
    const options = {
        'A X': 3 + 1, 'A Y': 6 + 2, 'A Z': 0 + 3,
        'B X': 0 + 1, 'B Y': 3 + 2, 'B Z': 6 + 3,
        'C X': 6 + 1, 'C Y': 0 + 2, 'C Z': 3 + 3,
    }
    return data
        .map(line => options[line as keyof typeof options])
        .reduce((a, b) => a + b, 0)
}

export const test1: TestCase[] = [
    ["A Y", 8],
    ["B X", 1],
    ["C Z", 6],
    ["A Y\nB X\nC Z", 15],
]

export const part2: Solver = async data => {
    const options = {
        'A X': 0 + 3, 'A Y': 3 + 1, 'A Z': 6 + 2,
        'B X': 0 + 1, 'B Y': 3 + 2, 'B Z': 6 + 3,
        'C X': 0 + 2, 'C Y': 3 + 3, 'C Z': 6 + 1,
    }
    return data
        .map(line => options[line as keyof typeof options])
        .reduce((a, b) => a + b, 0)
}

export const test2: TestCase[] = [
    ["A Y", 4],
    ["B X", 1],
    ["C Z", 7],
    ["A Y\nB X\nC Z", 12],
]
