import { toZonedTime } from 'date-fns-tz';
import { EmbedBuilder, TextChannel } from 'discord.js';
import { PRIMARY_COLOR, client, prismaClient } from '../client/client';
import { getYousoro } from '../client/utils';

export async function checkBirthday() {
  const today = toZonedTime(new Date(), 'Europe/Paris');
  const users = await prismaClient.users.findMany({
    where: { birthdayMonth: today.getMonth() + 1, birthdayDay: today.getDate() },
  });

  const guildsInDb = await prismaClient.guilds.findMany({
    where: { NOT: { birthdayChannelId: null } },
  });
  if (users.length > 0 && guildsInDb.length > 0) {
    for (const guildInDb of guildsInDb) {
      const start = new Date();
      const guild = client.guilds.cache.get(guildInDb.guildId);
      if (!guild) {
        continue;
      }

      const members = users.map(user => guild?.members.cache.get(user.userId)).filter(Boolean);
      if (!members.length) {
        continue;
      }

      const channel = guild?.channels.cache.get(guildInDb.birthdayChannelId!) as TextChannel;
      if (!channel) {
        continue;
      }

      await channel?.send({
        content: `Happy Birthday ${getYousoro(guild)} 🎂\n${members.join('\n')}`,
      });

      if (guildInDb.logsChannelId) {
        const logChannel = guild.channels.cache.get(guildInDb.logsChannelId) as TextChannel;
        if (!logChannel) {
          continue;
        }

        const embed = new EmbedBuilder().setColor(PRIMARY_COLOR).addFields({
          name: "Check members' birthday",
          value: `${new Date().getTime() - start.getTime()}ms`,
        });
        await logChannel.send({ embeds: [embed] });
      }
    }
  }
}
