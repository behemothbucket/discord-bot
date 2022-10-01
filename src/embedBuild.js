import {
    ActionRowBuilder,
    AttachmentBuilder,
    EmbedBuilder,
    SelectMenuBuilder,
} from "discord.js";

function showBuilds(heroInfo) {
    const file = new AttachmentBuilder("./img/build.png");

    const embed = new EmbedBuilder()
        .setColor("0x0099ff")
        .setTitle(`Билды на ${heroInfo.urlHeroName}`)
        .setURL(heroInfo.buildsURL)
        .setDescription("👆Ссылка на эти все билды вверху")
        .setThumbnail(heroInfo.avatar)
        .addFields({
            name: "Шесть последних билдов",
            value: "Загружено шесть последних билдов",
        })
        .setImage("attachment://build.png");

    return { embeds: [embed], files: [file] };
}

function showMenu(content) {
    const data = JSON.parse(content);

    let menu = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Выберите билд")
            .addOptions(
                {
                    label: data.name[0],
                    value: data.url[0],
                },
                {
                    label: data.name[1],
                    value: data.url[1],
                },
                {
                    label: data.name[2],
                    value: data.url[2],
                },
                {
                    label: data.name[3],
                    value: data.url[3],
                },
                {
                    label: data.name[4],
                    value: data.url[4],
                },
                {
                    label: data.name[5],
                    value: data.url[5],
                }
            )
    );

    return { components: [menu] };
}

export { showBuilds, showMenu };
