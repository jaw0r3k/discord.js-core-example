import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ButtonStyle, InteractionType, MessageFlags } from "@discordjs/core";

export default {
    name: "ping",
    interactionType: InteractionType.ApplicationCommand,
    async execute(interaction, api) {
        await api.interactions.reply(interaction.id, interaction.token, {
            content: "Pong!",
            flags: MessageFlags.Ephemeral,
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setStyle(ButtonStyle.Secondary).setEmoji({ name: '🏓' }).setLabel("Ping").setCustomId("ping-button"),
            )],
          });
    }
}
