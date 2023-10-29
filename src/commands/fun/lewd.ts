import { SlashCommand } from '../../types/slash-command';

export const lewdCommand = new SlashCommand()
  .setName('lewd')
  .setDescription('I am not LEWD!')
  .setExecute(interaction =>
    interaction.reply({ files: ['src/assets/notlewd.jpg'] }),
  );
