let levels = Array.from(document.querySelector(".talents").children);

let talents = {};

// Поиск номеров уровней
for (let i = 0; i < levels.length; i++) {
    talents[levels[i].children[0].childNodes[0].textContent.trim()] =
        Array.from(levels[i].children)
            .slice(1)
            .map((a) => {
                return a.href
                    .split("/")
                    .pop()
                    .split("-")
                    .map((word) => {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    })
                    .join(" ");
            });
}

let result = JSON.stringify({ talents: talents });
