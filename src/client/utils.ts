import { ChatInputCommandInteraction, Colors, EmbedBuilder, Guild, GuildMember } from 'discord.js';

import { ReplyType } from '../types/reply-type';
import { PRIMARY_COLOR } from './client';

export function getYousoro(guild: Guild | null): string {
  const emoji = guild ? guild.emojis.cache.find(({ name }) => name === 'yousoro') : null;
  return emoji ? `${emoji}` : '(> ᴗ •)ゞ';
}

export function getDefaultInteractionOptionMember(
  interaction: ChatInputCommandInteraction,
  field: string,
): GuildMember {
  return (interaction.options.getMember(field) as GuildMember) ?? interaction.member;
}

export function createBotEmbed(params: {
  description: string;
  replyType?: ReplyType;
}): EmbedBuilder {
  const embed = new EmbedBuilder().setDescription(params.description);

  switch (params.replyType) {
    case ReplyType.ERROR:
      embed.setAuthor({ name: '⚠️ Error' });
      embed.setColor(Colors.Red);
      embed.setFooter({ text: 'report issue at https://github.com/Sylux6/WatanaBot.ts/issues' });
      break;
    case ReplyType.WARNING:
      embed.setAuthor({ name: '⚠️ Warning' });
      embed.setColor(Colors.Yellow);
      break;
    default:
      embed.setColor(PRIMARY_COLOR);
  }

  return embed;
}
