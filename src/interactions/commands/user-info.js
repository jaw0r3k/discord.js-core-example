import { ContextMenuCommandBuilder, EmbedBuilder } from "@discordjs/builders";
import { ApplicationCommandType } from "@discordjs/core";

export default {
    data: new ContextMenuCommandBuilder().setName("User Info").setType(ApplicationCommandType.User),
    execute(interaction, api, options) {
        const selectedUser = options.getTargetUser()
        const selectedMember = options.getTargetMember()

        const embed = new EmbedBuilder()
            .setTitle("User info")
            .addFields(
                // After username update, this will need an update
                { name: "Tag", value: `${selectedUser.username}#${selectedUser.discriminator}`, inline: true }, 
                { name: "Nickname", value: selectedMember?.nick ?? "None", inline: true },
                { name: "Bot", value: selectedUser.bot ? "Yes" : "No" },
                { name: "Roles", value: selectedMember ? selectedMember.roles.map(id => `<@&${id}>`).join(", ") || "None" : "We are not in a guild"},
                { name: "Joined server", value: selectedMember ? `<t:${Math.floor(new Date(selectedMember.joined_at) / 1000)}:R>` : "We are not in a guild"},
                )
            .setThumbnail(
                selectedUser.avatar 
                ? api.rest.cdn.avatar(selectedUser.id, selectedUser.avatar) 
                : api.rest.cdn.defaultAvatar(selectedUser.discriminator % 5)
            )
            .setColor(selectedUser.accent_color || 0xABCDEF)

            api.interactions.reply(interaction.id, interaction.token, { 
                embeds: [embed.toJSON()]
            })
    }
}