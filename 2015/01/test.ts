import test from "ava";
import part1 from "./part1";
import part2 from "./part2";

test("2015-01 P1", t => {
    t.is(part1("(())"), 0);
    t.is(part1("()()"), 0);
    t.is(part1("((("), 3);
    t.is(part1("(()(()("), 3);
    t.is(part1("))((((("), 3);
    t.is(part1("())"), -1);
    t.is(part1("))("), -1);
    t.is(part1(")))"), -3);
    t.is(part1(")())())"), -3);
});

test("2015-01 P2", t => {
    t.is(part2(")"), 1);
    t.is(part2("()())"), 5);
});