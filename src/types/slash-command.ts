import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class SlashCommand extends SlashCommandBuilder {
  execute: (_: ChatInputCommandInteraction) => void = async () => {
    throw new Error('Not implemented method.');
  };

  setExecute(callback: (_: ChatInputCommandInteraction) => void): SlashCommand {
    this.execute = callback;
    return this;
  }
}
