import axios from "axios";
import {readFileSync} from "fs";

const part1: (d: number[]) => number = data => {
    let count = 0;
    for (let i = 1; i < data.length; i++) {
        if (data[i] > data[i - 1]) count++;
    }
    return count;
};
export default part1;

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const {data} = await axios.get("https://adventofcode.com/2021/day/1/input", {headers: {cookie}});
    console.log(typeof data);
    const lines = data.trim().split("\n").map(v => parseInt(v));
    console.log("The answer is", part1(lines));
})();