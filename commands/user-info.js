import { ContextMenuCommandBuilder } from "@discordjs/builders";
import { ApplicationCommandType } from "@discordjs/core";

export default new ContextMenuCommandBuilder().setName("User Info").setType(ApplicationCommandType.User)
