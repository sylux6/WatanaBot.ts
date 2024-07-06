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
    this.addBooleanOption(options =>
      options.setName('original').setDescription('Get the original profile avatar'),
    );
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const member = getDefaultInteractionOptionMember(interaction, 'member');
    const original = interaction.options.getBoolean('original');

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${member}`)
          .setImage(
            (original ? member.user : member).avatarURL({ size: 4096 }) ??
              member.user.avatarURL({ size: 4096 }),
          ),
      ],
    });
  }
}
