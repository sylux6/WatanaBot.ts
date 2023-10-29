import { ChatInputCommandInteraction } from 'discord.js';

import { SlashCommand } from '../../types/slash-command';

export class LewdCommand extends SlashCommand {
  name = 'lewd';
  description = "I'm not LEWD!";

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    interaction.reply({ files: ['src/assets/notlewd.jpg'] });
  }
}
