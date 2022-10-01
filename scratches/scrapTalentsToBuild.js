import heroes from "../src/config/heroes.js";
import clipboardy from "clipboardy";

// Ищем билд
// let buildArray = Array.from(
//     document.querySelector(".build-container").querySelectorAll(".talent-title")
// ).map((talent) => {
//     return (talent = talent.innerHTML);
// });

// Мутируем
let testBuildArray = [
    "Timewalker's Pursuit", // 3
    "Andorhal Anomaly", // 3
    "A Proper Greeting", // 3
    "Temporal Loop", // 2
    "Time Out", // 3
    "Quantum Overdrive", // 3
    "Stuck in a Loop", // 2
];

testBuildArray.forEach((currentValue, index, array) => {
    for (const key in heroes.chromie.talents) {
        if (heroes.chromie.talents[key].includes(currentValue)) {
            array[index] =
                heroes.chromie.talents[key].indexOf(currentValue) + 1;
        }
    }
});

const build = `[T${testBuildArray.join("")},${
    heroes.chromie.urlHeroName.charAt(0).toLocaleUpperCase() +
    heroes.chromie.urlHeroName.slice(1)
}]`;

copyToClipBoard(build);

async function copyToClipBoard(build) {
    await clipboardy.write(build);
}
