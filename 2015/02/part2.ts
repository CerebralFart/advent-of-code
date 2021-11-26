import axios from "axios";
import {readFileSync} from "fs";

const part2: (size: string) => number = size => {
    const [l, w, h] = size.split("x").map(v => parseInt(v));

    const max = Math.max(l, w, h);

    return 2 * (l + w + h - max) + l * w * h;
};
export default part2;

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const {data} = await axios.get("https://adventofcode.com/2015/day/2/input", {headers: {cookie}});
    const answer = data.trim().split("\n").map(part2).reduce((a, b) => a + b);
    console.log("The answer is", answer);
})();