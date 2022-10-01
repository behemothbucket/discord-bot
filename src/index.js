import pkg from "discord.js";
import clipboardy from "clipboardy";
import heroesData from "./config/heroes.js";
import config from "./config/config.js";
import { showBuilds, showMenu } from "./embedBuild.js";
import { getImageScreenshot } from "./captureScreenshot.js";
import storeBuildsInfo from "./scrapHeroBuilds.js";
import fs from "fs";

const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
} = pkg;

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

let buildCode = null;

bot.on("ready", () => {
    console.log("Ready!");

    bot.user.setPresence({
        activities: [{ name: "билды 🔎", type: 3 }],
        status: "online",
    });
});

bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const heroNameCmd = interaction.commandName;

    if (Object.keys(heroesData).includes(heroNameCmd)) {
        const progressEmbed = new EmbedBuilder()
            .setColor(0x979c9f)
            .setTitle("🔎 Ищу билды");

        const menuProgressEmbed = new EmbedBuilder()
            .setColor(0x979c9f)
            .setTitle("📃 Загружаю меню ✍️");

        await interaction.reply({ embeds: [progressEmbed] });

        await getImageScreenshot(heroesData[heroNameCmd].buildsURL);
        await interaction.editReply(showBuilds(heroesData[heroNameCmd]));

        const test = await interaction.channel.send({
            embeds: [menuProgressEmbed],
        });

        await storeBuildsInfo(heroesData[heroNameCmd].buildsURL)
            .then(() => {
                const buildsData = fs.readFileSync(
                    "./config/buildsInfo.txt",
                    "utf8"
                );
                return buildsData;
            })
            .then((result) => {
                let menu = showMenu(result);

                interaction.editReply(menu);
            });

        await test.delete();
    }
});

bot.on("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "select") {
        const buttonLink = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Посмотреть билд")
                    .setStyle(5)
                    .setEmoji("🏗️")
                    .setURL(...interaction.values)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("Copy build")
                    .setLabel("Скопировать")
                    .setStyle(ButtonStyle.Primary)
            );

        [buildCode] = interaction.values;

        await interaction.update({
            components: [buttonLink],
        });
    }
});

async function copyToClipBoard(build) {
    await clipboardy.write(build);
}

bot.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === "Copy build") {
            interaction.update({
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId("Copied")
                            .setLabel("Скопировано")
                            .setStyle(ButtonStyle.Success)
                            .setDisabled(true)
                    ),
                ],
            });
            copyToClipBoard(buildCode);
        }
    }
});

bot.login(config.token);
