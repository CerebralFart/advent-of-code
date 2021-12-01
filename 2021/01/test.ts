import test from "ava";
import part1 from "./part1";
import part2 from "./part2";

test("2021-01 P1", t => {
    t.is(part1([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), 7);
});

test("2021-01 P2", t => {
    t.is(part2([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]), 5);
});