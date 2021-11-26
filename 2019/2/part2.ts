import axios from "axios";
import {readFileSync} from "fs";
import IntCode from "../intcode";

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const machine = new IntCode([1, 2, 99]);
    const data = await axios.get("https://adventofcode.com/2019/day/2/input", {headers: {cookie}});

    for (let i = 0; i < 10000; i++) {
        const program = data.data.split(",").map(v => parseInt(v));
        program[1] = Math.floor(i / 100);
        program[2] = i % 100;
        const output = machine.execute(program);
        if (output[0] === 19690720) {
            console.log("The answer is", i);
            return;
        }
    }
})();