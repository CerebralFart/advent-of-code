import axios from "axios";
import {readFileSync} from "fs";
import IntCode from "../intcode";

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const machine = new IntCode([1, 2, 99]);
    const data = await axios.get("https://adventofcode.com/2019/day/2/input", {headers: {cookie}});
    const program = data.data.split(",").map(v => parseInt(v));
    program[1] = 12;
    program[2] = 2;
    const output = machine.execute(program);
    console.log("The answer is", output[0]);
})();