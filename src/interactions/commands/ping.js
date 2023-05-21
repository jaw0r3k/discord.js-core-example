import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { ApplicationCommandType, ButtonStyle, MessageFlags } from "@discordjs/core";

export default {
    data: new SlashCommandBuilder().setName("ping").setDescription("Responds with pong!"),
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
