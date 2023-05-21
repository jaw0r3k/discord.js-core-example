import { Routes } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import * as fs from "node:fs";
import * as dotenv from 'dotenv';

dotenv.config();

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const folderPath = new URL('interactions/commands/', import.meta.url);
const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

// Grab the Builder#toJSON() output of each command's for deployment
for (const file of commandFiles) {
    const fileData = (await import(new URL(file, folderPath).toString())).default;
    if(!fileData?.data) continue;
    commands.push(fileData.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

console.log(`Started deploying ${commands.length} application commands.`);

const data = await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands },
);

console.log(`Successfully loaded ${data.length} application commands!`);
