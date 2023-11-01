import { ChatInputCommandInteraction } from 'discord.js';

import { SlashCommand } from '../../types/slash-command';

export class HentaiCommand extends SlashCommand {
  name = 'hentai';
  description = "I'm not HENTAI!";

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({
      files: ['src/assets/nothentai.jpg'],
    });
  }
}
