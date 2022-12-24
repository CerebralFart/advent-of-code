import {Solver, TestCase} from "../../types";

export const part1: Solver = async data => data.map(line => {
    const [s1, e1, s2, e2] = line.split(/[-,]/);
    return (s1 >= s2 && e1 <= e2) || (s1 <= s2 && e1 >= e2)
}).filter(match => match).length;

export const test1: TestCase[] = [
    ['2-4,6-8', 0],
    ['2-3,4-5', 0],
    ['5-7,7-9', 0],
    ['2-8,3-7', 1],
    ['6-6,4-6', 1],
    ['2-6,4-8', 0],
    ['2-4,6-8\n2-3,4-5\n5-7,7-9\n2-8,3-7\n6-6,4-6\n2-6,4-8', 2],
]