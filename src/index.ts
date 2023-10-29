import { Events } from 'discord.js';

import { token } from '../config.json';
import { client } from './client/client';
import { handleClientReady } from './client/events/client-ready';
import { handleGuildMemberRemove } from './client/events/guild-member-remove';
import { handleInteractionCreate } from './client/events/interaction-create';
import { handleMessageCreate } from './client/events/message-create';

void client.login(token);

client.once(Events.ClientReady, handleClientReady);
client.on(Events.InteractionCreate, handleInteractionCreate);
client.on(Events.GuildMemberRemove, handleGuildMemberRemove);
client.on(Events.MessageCreate, handleMessageCreate);
