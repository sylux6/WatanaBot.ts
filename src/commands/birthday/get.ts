import { format, parse } from 'date-fns';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';

import { PRIMARY_COLOR, db } from '../../client/client';
import { getDefaultInteractionOptionMember } from '../../client/utils';

export async function get(interaction: ChatInputCommandInteraction) {
  const member = getDefaultInteractionOptionMember(interaction, 'member');
  const user = await db.users.findUnique({
    where: { userId: member.id },
  });
  if (user && user.birthdayMonth && user.birthdayDay) {
    const birthday = parse(`${user.birthdayDay} ${user.birthdayMonth}`, 'd M', new Date());
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: member.displayName,
            iconURL: member.user.avatarURL({ size: 32 })!,
          })
          .setDescription(`🎂 ${format(birthday, 'do')} of ${format(birthday, 'LLLL')}`)
          .setColor(PRIMARY_COLOR),
      ],
    });
  } else {
    await interaction.reply({
      content: `${member.displayName} has not set their birthday`,
    });
  }
}
