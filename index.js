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

// Load interactions listed in `interactions` directory
const interactions = new Collection()

const interactionFiles = fs.readdirSync(`./interactions`).filter((file) => file.endsWith(".js"));

for (const file of interactionFiles) {
    const fileData = (await import(`./interactions/${file}`)).default;

    if(fileData.name && typeof fileData.execute === "function") interactions.set(fileData.name, fileData);
}

// Listen for interactions
client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {

  const interactionData = interactions.get(interaction.data.name ?? interaction.data.custom_id)
  if(interactionData && interaction.type === interactionData.interactionType) interactionData.execute(interaction, api);
});

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, ({ data }) => console.log(`Your ${data.user.username} is ready!`));

// Start the WebSocket connection.
gateway.connect();
