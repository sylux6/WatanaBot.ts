import { ChatInputCommandInteraction } from 'discord.js';

import { SlashCommand } from '../../types/slash-command';

export class RollCommand extends SlashCommand {
  name = 'roll';
  description = 'Roll a random number between 1 and 100';

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    interaction.reply({ content: `${Math.floor(Math.random() * 101)}` });
  }
}
