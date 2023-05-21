import { ComponentType, MessageFlags } from "@discordjs/core";

export default {
    name: "ping-button",
    // Component type to splecify
    // Aviable are Button, StringSelectMenu, RoleSelectMenu etc
    componentType: ComponentType.Button,
    async execute(interaction, api) {
        // Use an api endpoint to reply to the interaction
        await api.interactions.reply(interaction.id, interaction.token, {
            content: "Pong! 🤣",
            flags: MessageFlags.Ephemeral,
          });
    }
}
