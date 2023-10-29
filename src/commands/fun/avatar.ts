import { EmbedBuilder, GuildMember } from 'discord.js';

import { SlashCommand } from '../../types/slash-command';

export const avatarCommand = new SlashCommand()
  .setName('avatar')
  .setDescription('Get avatar from a member')
  .addUserOption(option =>
    option
      .setName('member')
      .setDescription('The member to get the avatar from'),
  )
  .setExecute(interaction => {
    const member: GuildMember = (interaction.options.get('member')?.member ??
      interaction.member) as GuildMember;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${member}`)
          .setImage(member.user.avatarURL({ size: 256 })),
      ],
    });
  });
