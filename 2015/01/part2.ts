import axios from "axios";
import {readFileSync} from "fs";

const part2: (input: string) => number = (input) => {
    let floor = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        if (char === "(") floor++;
        if (char === ")") floor--;
        if (floor < 0) return i + 1;
    }
};

export default part2;

(async () => {
    const cookie = readFileSync("cookie.txt").toString();
    const {data} = await axios.get("https://adventofcode.com/2015/day/1/input", {headers: {cookie}});
    console.log("The answer is", part2(data));
})();