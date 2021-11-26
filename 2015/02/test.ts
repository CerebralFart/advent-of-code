import test from "ava";
import part1 from "./part1";
import part2 from "./part2";

test("2015-02 P1", t => {
    t.is(part1("2x3x4"), 58);
    t.is(part1("1x1x10"), 43);
});

test("2015-02 P2", t => {
    t.is(part2("2x3x4"), 34);
    t.is(part2("1x1x10"), 14);
});