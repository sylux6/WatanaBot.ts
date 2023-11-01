import { PrismaClient } from '@prisma/client';
import { Client, GatewayIntentBits, HexColorString, REST } from 'discord.js';

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
export const db = new PrismaClient();
export const PRIMARY_COLOR: HexColorString = '#5594D7';
