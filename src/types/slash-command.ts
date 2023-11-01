import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class NotImplementedError extends Error {}

export class SlashCommand extends SlashCommandBuilder {
  async execute(_: ChatInputCommandInteraction) {
    throw new NotImplementedError();
  }
}
