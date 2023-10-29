import { Interaction } from 'discord.js';

import { REEXPORTED_COMMANDS } from '../../commands/commands';

export function handleInteractionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName in REEXPORTED_COMMANDS) {
    REEXPORTED_COMMANDS[interaction.commandName].execute(interaction);
  } else {
    interaction.reply({
      content: `Command ${interaction.commandName} doesn't exist.`,
    });
  }
}
