import { GuildMember, PartialGuildMember } from 'discord.js';

import { privateGuildId } from '../../../config.json';

export function handleGuildMemberRemove(
  interaction: GuildMember | PartialGuildMember,
) {
  // TODO
  if (interaction.guild.id === privateGuildId) return;
}
