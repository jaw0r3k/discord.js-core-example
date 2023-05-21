import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, Client, ApplicationCommandType } from "@discordjs/core";
import { Collection } from '@discordjs/collection'
import * as dotenv from "dotenv";
import * as fs from "node:fs";
import { InteractionOptionResolver } from '@sapphire/discord-utilities'
// Load environment variables from .env
dotenv.config();

// Create REST and WebSocket managers directly
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const gateway = new WebSocketManager({
  token: process.env.DISCORD_TOKEN,
  intents: GatewayIntentBits.Guilds,
  rest,
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });


// Load interactions listed in folders in `interactions` directory
const interactions = new Collection()

const foldersPath = new URL('interactions/', import.meta.url);
const interactionFolders = fs.readdirSync(foldersPath);

for (const folder of interactionFolders) {
  const interactionsPath = new URL(folder, foldersPath)
  const interactionFiles = fs.readdirSync(interactionsPath).filter((file) => file.endsWith(".js"));
  for (const file of interactionFiles) {
    const fileData = (await import(new URL(`${folder}/${file}`, interactionsPath).toString())).default;

    if (folder === "commands"){
      if (fileData.data && typeof fileData.execute === "function" ) interactions.set(fileData.data.name, { ...fileData, type: fileData.data.type ?? ApplicationCommandType.ChatInput, folder });
    } else { 
      if (fileData.name && typeof fileData.execute === "function") interactions.set(fileData.name, { ...fileData, folder });
    }
  }
}


// Listen for interactions
client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
  let interactionData;
  let resolver;

  switch (interaction.type) {
    case InteractionType.ApplicationCommand:
      resolver = InteractionOptionResolver(interaction)
      interactionData = interactions.find(i => i.data.name === interaction.data.name && i.folder === 'commands' && i.type === interaction.data.type);
      break;
    case InteractionType.ApplicationCommandAutocomplete:
      resolver = InteractionOptionResolver(interaction)
      interactionData = interactions.find(i => i.name === interaction.data.name  && i.folder === 'autocompletes');
      break;
    case InteractionType.MessageComponent:
      interactionData = interactions.find(i => i.name === interaction.data.custom_id  && i.folder === 'components' && i.componentType === interaction.data.component_type);
      break;
    case InteractionType.ModalSubmit:
      // TODO: Field resolver
      interactionData = interactions.find(i => i.name === interaction.data.custom_id  && i.folder === 'modals');
      break;
  }
  interactionData.execute(interaction, api, resolver)
});


// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, ({ data }) => console.log(`Your ${data.user.username} is ready!`));


// Start the WebSocket connection.
gateway.connect();
