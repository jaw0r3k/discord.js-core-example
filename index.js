import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { GatewayDispatchEvents, GatewayIntentBits, InteractionType, Client } from "@discordjs/core";
import { Collection } from '@discordjs/collection'
import * as dotenv from "dotenv";
import * as fs from "node:fs";

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

    if(fileData.name && typeof fileData.execute === "function") interactions.set(fileData.name, { ...fileData, type: folder });
  }
}


// Listen for interactions
client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
  let interactionData;

  switch (interaction.type) {
    case InteractionType.ApplicationCommand:
      interactionData = interactions.find(i => i.name === interaction.data.name && i.type === 'commands' && i.commandType === interaction.data.type);
      break;
    case InteractionType.ApplicationCommandAutocomplete:
      interactionData = interactions.find(i => i.name === interaction.data.name  && i.type === 'autocompletes');
      break;
    case InteractionType.MessageComponent:
      interactionData = interactions.find(i => i.name === interaction.data.custom_id  && i.type === 'components' && i.componentType === interaction.data.component_type);
      break;
    case InteractionType.ModalSubmit:
      interactionData = interactions.find(i => i.name === interaction.data.custom_id  && i.type === 'modals');
      break;
  }

  interactionData.execute(interaction, api)
});


// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, ({ data }) => console.log(`Your ${data.user.username} is ready!`));


// Start the WebSocket connection.
gateway.connect();
