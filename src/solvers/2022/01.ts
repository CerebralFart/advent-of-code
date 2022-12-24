import {Solver, TestCase} from "../../types";

export const part1: Solver = async data => {
    let elfIdx = 0;
    let carrying: number[] = [0];

    for (const line of data) {
        if (line === '') {
            elfIdx++;
            carrying[elfIdx] = 0;
        } else {
            carrying[elfIdx] += parseInt(line);
        }
    }

    return Math.max(...carrying);
}

export const test1: TestCase[] = [
    ['1000\n2000\n3000', 6000],
    ['4000', 4000],
    ['5000\n6000', 11000],
    ['7000\n8000\n9000', 24000],
    ['10000', 10000],
    ['1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000', 24000]
]

export const part2: Solver = async data => {
    let elfIdx = 0;
    let carrying: number[] = [0];

    for (const line of data) {
        if (line === '') {
            elfIdx++;
            carrying[elfIdx] = 0;
        } else {
            carrying[elfIdx] += parseInt(line);
        }
    }

    carrying.sort((a, b) => b - a);
    return carrying[0] + carrying[1] + carrying[2];
}

export const test2: TestCase[] = [
    ['1000\n2000\n3000\n\n4000\n\n5000\n6000\n\n7000\n8000\n9000\n\n10000', 45000]
]