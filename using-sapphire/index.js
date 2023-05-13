import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { GatewayDispatchEvents, GatewayIntentBits, Client } from "@discordjs/core";
import * as dotenv from "dotenv";

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

// Listen for the ready event
client.once(GatewayDispatchEvents.Ready, ({ data }) => console.log(`Your ${data.user.username} is ready!`));

// Start the WebSocket connection.
gateway.connect();
