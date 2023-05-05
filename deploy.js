import { Routes } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import * as fs from "node:fs";
import * as dotenv from 'dotenv';
import { SlashCommandBuilder } from "@discordjs/builders";

dotenv.config();

const commands = [];
// Grab all the command folders from the commands directory you created earlier

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's for deployment
for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`)).default;
    if (command instanceof SlashCommandBuilder) {
        commands.push(command.toJSON());
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

console.log(`Started deploying ${commands.length} application commands.`);

const data = await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands },
);

console.log(`Successfully loaded ${data.length} application commands!`);
