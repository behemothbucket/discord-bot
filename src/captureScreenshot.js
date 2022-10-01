import captureWebsite from "capture-website";

export async function getImageScreenshot(url) {
    await captureWebsite.file(url, "./img/build.png", {
        clip: {
            x: 95,
            y: 800,
            width: 1090,
            height: 500,
        },
        overwrite: true,
    });
}
