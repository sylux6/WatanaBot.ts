import { Message } from 'discord.js';

import { client, config } from '../client';
import { getYousoro } from '../utils';

export async function handleMessageCreate(message: Message<boolean>) {
  const content = message.content.toLowerCase();

  if (message.inGuild() && message.guildId === config.privateGuildId) {
    if ((content.includes('yousoro') || content.includes('sylux6yo')) && !message.author.bot) {
      const reaction = message.guild?.emojis?.cache?.find(({ name }) => name === 'yousoro');
      if (reaction) {
        await message.react(reaction);
      }
    }
  }

  if (content.includes('zensoku zenshin')) {
    message.channel.send('YOUSORO!~ (> ᴗ •)ゞ');
  }

  if (message.mentions.has(client.user!)) {
    if (content.includes('lewd')) {
      message.channel.send({
        content: "I'm not lewd!",
        reply: { messageReference: message },
      });
    } else {
      message.channel.send({
        content: getYousoro(message.guild),
        reply: { messageReference: message },
      });
    }
  }
}
