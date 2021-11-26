import axios from "axios";
import {readFileSync} from "fs";

const part1: (size: string) => number = size => {
    const [l, w, h] = size.split("x").map(v => parseInt(v));

    const lw = l * w;
    const lh = l * h;
    const wh = w * h;

    const min = Math.min(lw, lh, wh);

    return 2 * (lw + lh + wh) + min;
};
export default part1;

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const {data} = await axios.get("https://adventofcode.com/2015/day/2/input", {headers: {cookie}});
    const answer = data.trim().split("\n").map(part1).reduce((a, b) => a + b);
    console.log("The answer is", answer);
})();