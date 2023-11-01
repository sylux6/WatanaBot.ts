import { Client, Routes } from 'discord.js';

import { ALL_COMMANDS } from '../../commands/commands';
import { config, rest } from '../client';

export async function handleClientReady(client: Client<true>) {
  console.log(`Yousoro!~ (> ᴗ •)ゞ - Logged in as ${client.user.tag}`);

  await rest.put(Routes.applicationCommands(config.clientId), {
    body: Object.values(ALL_COMMANDS),
  });
}
