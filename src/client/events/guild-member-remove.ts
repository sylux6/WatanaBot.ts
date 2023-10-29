import { GuildMember, PartialGuildMember } from 'discord.js';

import { config } from '../client';

export function handleGuildMemberRemove(
  interaction: GuildMember | PartialGuildMember,
) {
  // TODO
  if (interaction.guild.id === config.privateGuildId) return;
}
