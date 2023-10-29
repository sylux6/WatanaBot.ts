import { Client, GatewayIntentBits, REST } from 'discord.js';

import { token } from '../../config.json';

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
export const rest = new REST().setToken(token);
