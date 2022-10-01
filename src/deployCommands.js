import pkg from "discord.js";
import config from "./config/config.js";
import heroesData from "./config/heroes.js";

const { REST, SlashCommandBuilder, Routes } = pkg;

const heroKey = Object.keys(heroesData);

let commands = heroKey.map((hero) =>
    new SlashCommandBuilder()
        .setName(hero.toLowerCase())
        .setDescription(`Билд на ${hero}`)
);

const rest = new REST({ version: "10" }).setToken(config.token);

rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
    body: commands,
})
    .then((data) =>
        console.log(
            `Successfully registered ${data.length} application commands.`
        )
    )
    .catch(console.error);
