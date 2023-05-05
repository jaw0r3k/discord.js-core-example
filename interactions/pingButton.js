import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle, InteractionType, MessageFlags } from "@discordjs/core";

export default {
    name: "ping-button",
    interactionType: InteractionType.MessageComponent,
    async execute(interaction, api) {
        await api.interactions.reply(interaction.id, interaction.token, {
            content: "Pong! 🤣",
            flags: MessageFlags.Ephemeral,
          });
    }
}
