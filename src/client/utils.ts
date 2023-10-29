import { Guild } from 'discord.js';

export function getYousoro(guild: Guild | null): string {
  const emoji = guild
    ? guild.emojis.cache.find(({ name }) => name === 'yousoro')
    : null;
  return emoji ? `${emoji}` : '(> ᴗ •)ゞ';
}
