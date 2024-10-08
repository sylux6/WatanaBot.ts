import * as fs from 'node:fs';

import { Client, GatewayIntentBits, HexColorString, REST } from 'discord.js';

import { PrismaClient } from '@prisma/client';
import { Config } from '../types/config';

function getConfig(): Config {
  if (fs.existsSync('config.json')) {
    return JSON.parse(fs.readFileSync('config.json', 'utf-8'));
  } else {
    return {
      token: process.env.TOKEN ?? '',
      clientId: process.env.CLIENT_ID ?? '',
      postgresDb: process.env.POSTGRES_DB ?? '',
      postgresPassword: process.env.POSTGRES_PASSWORD ?? '',
      postgresUser: process.env.POSTGRES_USER ?? '',
    };
  }
}

export const config: Config = getConfig();
export const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});
export const rest = new REST().setToken(config.token);
export const prismaClient = new PrismaClient();
export const PRIMARY_COLOR: HexColorString = '#5594D7';
