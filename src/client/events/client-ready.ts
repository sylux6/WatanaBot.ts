import { Client, Routes } from 'discord.js';

import { REEXPORTED_COMMANDS } from '../../commands/commands';
import { config, rest } from '../client';

export function handleClientReady(client: Client<true>) {
  console.log(`Yousoro!~ (> ᴗ •)ゞ - Logged in as ${client.user.tag}`);

  rest.put(Routes.applicationCommands(config.clientId), {
    body: Object.values(REEXPORTED_COMMANDS),
  });
}
