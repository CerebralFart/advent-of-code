import axios from "axios";
import {readFileSync} from "fs";

const count: (needle: string, haystack: string) => number = (needle, haystack) => haystack.split(needle).length - 1;

const part1: (input: string) => number = input => count("(", input) - count(")", input);
export default part1;

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const {data} = await axios.get("https://adventofcode.com/2015/day/1/input", {headers: {cookie}});
    console.log("The answer is", part1(data));
})();