import {Solver, TestCase} from "../../types";
import BitmaskFactory from "../../helpers/bitmask";

const priorityList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const factory = new BitmaskFactory(priorityList);

export const part1: Solver = async data => data.map(line => {
    const compartmentSize = line.length / 2;
    const first = factory.create(line.substring(0, compartmentSize).split(''));
    const second = factory.create(line.substring(compartmentSize).split(''));
    const intersect = first.and(second).flags;
    if (intersect.length !== 1) throw new Error("Intersection does not have exactly one element");
    return priorityList.indexOf(intersect[0]) + 1;
}).reduce((a, b) => a + b, 0)


export const test1: TestCase[] = [
    ['vJrwpWtwJgWrhcsFMMfFFhFp', 16],
    ['jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL', 38],
    ['PmmdzqPrVvPwwTWBwg', 42],
    ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn', 22],
    ['ttgJtRGJQctTZtZT', 20],
    ['CrZsJsPPZsGzwwsLwLmpwMDw', 19],
    ['vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw', 157]
]

export const part2: Solver = async data => {
    let acc = 0;
    for (let i = 0; i < data.length; i += 3) {
        const e1 = factory.create(data[i + 0].split(''));
        const e2 = factory.create(data[i + 1].split(''));
        const e3 = factory.create(data[i + 2].split(''));
        const intersect = e1.and(e2).and(e3).flags;
        if (intersect.length !== 1) throw new Error("Intersection does not have exactly one element");
        acc += priorityList.indexOf(intersect[0]) + 1;
    }
    return acc;
}

export const test2: TestCase[] = [
    ['vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg', 18],
    ['wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw', 52],
    ['vJrwpWtwJgWrhcsFMMfFFhFp\njqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL\nPmmdzqPrVvPwwTWBwg\nwMqvLMZHhHMvwLHjbvcjnnSBnvTQFn\nttgJtRGJQctTZtZT\nCrZsJsPPZsGzwwsLwLmpwMDw', 70]
]