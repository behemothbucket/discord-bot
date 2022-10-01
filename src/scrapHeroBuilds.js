import puppeteer from "puppeteer";
import fs from "fs";

async function storeBuildsInfo(url) {
    await (async (buildsURL) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(buildsURL, {
            waitUntil: "networkidle2",
        });
        let bodyHTML = await page.evaluate(() => document.body.innerHTML);

        fs.writeFileSync(
            "./config/buildsInfo.txt",
            JSON.stringify(getBuildNameAndURL(bodyHTML)),
            function (err) {
                if (err) {
                    return console.log(err);
                }
            }
        );
        await browser.close();
    })(url);
}

function getBuildNameAndURL(data) {
    return {
        name: data
            .match(/<span class="title">.*<\/span>/gm)
            .slice(1, 7)
            .map((span) => span.replace(/<[^>]*>/g, "")),
        url: data
            .match(/<a href="\/builds\/.+" class="build-list-containe/gm)
            .slice(0, 7)
            .map(
                (span) =>
                    `https://heroeshearth.com${
                        span.match(/(?<=")(?:\\.|[^"\\])*(?=")/gm)[0]
                    }`
            ),
    };
}

export default storeBuildsInfo;
