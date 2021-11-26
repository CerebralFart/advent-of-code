import test from "ava";
import IntCode from "../intcode";

const machine = new IntCode([1, 2, 99]);
test("2019-02 P1", t => {
    t.deepEqual(machine.execute([1, 0, 0, 3, 99]), [1, 0, 0, 2, 99]);
    t.deepEqual(machine.execute([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]), [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
    t.deepEqual(machine.execute([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]);
    t.deepEqual(machine.execute([2, 4, 4, 5, 99, 0]), [2, 4, 4, 5, 99, 9801]);
    t.deepEqual(machine.execute([1, 1, 1, 4, 99, 5, 6, 0, 99]), [30, 1, 1, 4, 2, 5, 6, 0, 99]);
});