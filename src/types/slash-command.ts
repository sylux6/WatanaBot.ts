import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export class SlashCommand extends SlashCommandBuilder {
  private static instance: SlashCommand;

  async execute(_: ChatInputCommandInteraction) {
    throw new Error('Not implemented method.');
  }

  protected constructor() {
    super();
  }

  public static getInstance(): SlashCommand {
    if (!SlashCommand.instance) {
      SlashCommand.instance = new this();
    }

    return SlashCommand.instance;
  }
}
