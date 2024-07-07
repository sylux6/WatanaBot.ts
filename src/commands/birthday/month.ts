import { format, parse } from 'date-fns';
import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { groupBy } from 'lodash';

import { PRIMARY_COLOR, prismaClient } from '../../client/client';

export async function month(interaction: ChatInputCommandInteraction) {
  const birthdayMonth = interaction.options.getInteger('month') ?? new Date().getUTCMonth() + 1;

  const users = await prismaClient.users.findMany({
    where: { birthdayMonth, birthdayDay: { not: null } },
    select: { userId: true, birthdayDay: true },
    orderBy: { birthdayDay: 'asc' },
  });

  // Guild members among the selected users in database
  const memberDict = Object.fromEntries(
    (
      await interaction.guild!.members.fetch({
        user: users.map(({ userId }) => userId),
      })
    ).map(member => [member.id, member]),
  );

  const embed = new EmbedBuilder()
    .setColor(PRIMARY_COLOR)
    .setTitle(`Birthdays in ${format(parse(`${birthdayMonth}`, 'M', new Date()), 'LLLL')}`);

  Object.entries(
    groupBy(
      users.filter(({ userId }) => userId in memberDict),
      ({ birthdayDay }) => birthdayDay,
    ),
  ).forEach(([day, birthdayUsers]) =>
    embed.addFields({
      name: `🎂 ${format(parse(`${day} ${birthdayMonth}`, 'd M', new Date()), 'dd/MM')}`,
      value: birthdayUsers.map(({ userId }) => `${memberDict[userId]}`).join('\n'),
    }),
  );

  await interaction.reply({ embeds: [embed] });
}
