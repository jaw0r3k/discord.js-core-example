import { ComponentType, MessageFlags } from "@discordjs/core";

export default {
    name: "ping-button",
    componentType: ComponentType.Button,
    async execute(interaction, api) {
        await api.interactions.reply(interaction.id, interaction.token, {
            content: "Pong! 🤣",
            flags: MessageFlags.Ephemeral,
          });
    }
}
