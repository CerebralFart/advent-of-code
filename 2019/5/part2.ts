import axios from "axios";
import {readFileSync} from "fs";
import IntCode from "../intcode";

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const machine = new IntCode([1, 2, 3, 4, 5, 6, 7, 8, 99]);
    const data = await axios.get("https://adventofcode.com/2019/day/5/input", {headers: {cookie}});
    const program = data.data.split(",").map(v => parseInt(v));
    machine.execute(program, [5]);
    const output = machine.getBufferOut();
    console.log("The answer is", output[output.length - 1]);
})();