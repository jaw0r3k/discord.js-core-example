import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { ApplicationCommandType, ButtonStyle, MessageFlags } from "@discordjs/core";

export default {
    name: "ping",
    commandType: ApplicationCommandType.ChatInput,
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
