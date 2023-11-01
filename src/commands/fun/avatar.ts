import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

import { getDefaultInteractionOptionMember } from '../../client/utils';
import { SlashCommand } from '../../types/slash-command';

export class AvatarCommand extends SlashCommand {
  name = 'avatar';
  description = 'Get avatar from a member';

  constructor() {
    super();
    this.addUserOption(option =>
      option.setName('member').setDescription('The member to get the avatar'),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const member = getDefaultInteractionOptionMember(interaction, 'member');

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${member}`)
          .setImage(member.user.avatarURL({ size: 256 })),
      ],
    });
  }
}
