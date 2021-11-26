import axios from "axios";
import {readFileSync} from "fs";

const count: (needle: string, haystack: string) => number = (needle, haystack) => haystack.split(needle).length - 1;

(async () => {
    const width = 25;
    const height = 6;
    const layerSize = width * height;

    const cookie = readFileSync("cookie.txt").toString();
    let {data} = await axios.get("https://adventofcode.com/2019/day/8/input", {
        headers: {cookie},
        transformResponse: r => r,
    });
    data = data.trim();

    const layers: string[] = new Array(Math.ceil(data.length / layerSize)).fill("");
    data.split("").forEach((char, idx) => {
        layers[Math.floor(idx / layerSize)] += char;
    });
    const selectedLayer = layers.reduce((a, b) => count("0", a) < count("0", b) ? a : b);

    console.log("The answer is", count("1", selectedLayer) * count("2", selectedLayer));
})();