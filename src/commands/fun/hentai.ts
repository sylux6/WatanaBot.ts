import { SlashCommand } from '../../types/slash-command';

export const hentaiCommand = new SlashCommand()
  .setName('hentai')
  .setDescription('I am not HENTAI!')
  .setExecute(interaction =>
    interaction.reply({ files: ['src/assets/nothentai.jpg'] }),
  );
