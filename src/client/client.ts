import { Client, GatewayIntentBits, REST } from 'discord.js';

import * as configJson from '../../config.json';
import { Config } from '../types/config';

export const config: Config = configJson;
export const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
export const rest = new REST().setToken(config.token);
