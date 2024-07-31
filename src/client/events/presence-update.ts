import { ActivityType, Presence } from 'discord.js';

export function handlePresenceUpdate(_: Presence | null, newPresence: Presence) {
  if (!newPresence.guild || !newPresence.member) {
    return;
  }
  const isStreaming = newPresence.activities.some(
    activity => activity.type === ActivityType.Streaming,
  );
  const role = newPresence.guild.roles.cache.find(({ name }) => name === 'On Live');

  if (role) {
    if (isStreaming) {
      newPresence.member.roles.add(role);
    } else {
      newPresence.member.roles.remove(role);
    }
  }
}
