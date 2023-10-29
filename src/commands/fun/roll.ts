import { SlashCommand } from '../../types/slash-command';

export const rollCommand = new SlashCommand()
  .setName('roll')
  .setDescription('Roll a random number between 1 and 100')
  .setExecute(interaction => {
    interaction.reply({ content: `${Math.floor(Math.random() * 101)}` });
  });
