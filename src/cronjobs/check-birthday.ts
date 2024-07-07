export async function checkBirthday() {
  // const today = toZonedTime(new Date(), 'Europe/Paris');
  // const users = await prismaClient.users.findMany({
  //   where: { birthdayMonth: today.getMonth() + 1, birthdayDay: today.getDate() },
  // });
  //
  // const guilds = await prismaClient.guilds.findMany({
  //   where: { NOT: { birthdayChannelId: null } },
  // });
  // if (users.length > 0 && guilds.length > 0) {
  //   for (const guild of guilds) {
  //     const clientGuild = await client.guilds.fetch(guild.guildId);
  //     const members = users.map(async user => await clientGuild.members.fetch(user.userId));
  //     clientGuild.channels.fetch(guild.birthdayChannelId!).then(channel =>
  //       (channel as TextChannel)?.send({
  //         content: `${(await clientGuild.emojis.fetch('yousoro'))} \uD83C\uDF82\\n`,
  //       }),
  //     );
  //   }
  // }
}
