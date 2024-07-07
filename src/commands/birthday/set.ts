import { format, isValid, parse } from 'date-fns';
import { ChatInputCommandInteraction, User } from 'discord.js';

import { prismaClient } from '../../client/client';
import { createBotEmbed, getDefaultInteractionOptionMember } from '../../client/utils';
import { ReplyType } from '../../types/reply-type';

export async function set(interaction: ChatInputCommandInteraction) {
  const birthdayDay = interaction.options.getInteger('day', true);
  const birthdayMonth = interaction.options.getInteger('month', true);
  const birthday = parse(`${birthdayDay} ${birthdayMonth}`, 'd M', new Date());

  // Date validation
  if (!isValid(birthday)) {
    await interaction.reply({
      embeds: [
        createBotEmbed({
          description: 'Invalid date',
          replyType: ReplyType.ERROR,
        }),
      ],
      ephemeral: true,
    });
    return;
  }

  const member = getDefaultInteractionOptionMember(interaction, 'member');

  // Permissions validation
  if (member.id !== interaction.user.id) {
    const owner: User = (await interaction.client.application.fetch()).owner as User;

    if (
      interaction.member?.user.id !== interaction.guild?.ownerId &&
      interaction.member?.user.id !== owner.id
    ) {
      await interaction.reply({
        embeds: [
          createBotEmbed({
            description: "You don't have enough permissions to set a birthday for another member",
            replyType: ReplyType.ERROR,
          }),
        ],
        ephemeral: true,
      });
      return;
    }
  }

  await prismaClient.users.upsert({
    create: { userId: member.id, birthdayDay, birthdayMonth },
    update: { birthdayDay, birthdayMonth },
    where: { userId: member.id },
  });

  await interaction.reply({
    embeds: [
      createBotEmbed({
        description: `${member} birthday is set to the ${format(birthday, 'do')} of ${format(
          birthday,
          'LLLL',
        )}`,
      }),
    ],
    ephemeral: true,
  });
}
