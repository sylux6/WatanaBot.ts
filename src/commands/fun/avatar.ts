import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  GuildMember,
} from 'discord.js';

import { SlashCommand } from '../../types/slash-command';

export class AvatarCommand extends SlashCommand {
  name = 'avatar';
  description = 'Get avatar from a member';

  protected constructor() {
    super();
    this.addUserOption(option =>
      option
        .setName('member')
        .setDescription('The member to get the avatar from'),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const member: GuildMember = (interaction.options.get('member')?.member ??
      interaction.member) as GuildMember;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${member}`)
          .setImage(member.user.avatarURL({ size: 256 })),
      ],
    });
  }
}
