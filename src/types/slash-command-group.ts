import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

import { SlashCommand } from './slash-command';

export class NotImplementedError extends Error {}

export class SlashCommandGroup extends SlashCommand {
  subcommands: Record<string, Function> = {};

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand in this.subcommands) {
      this.subcommands[subcommand](interaction);
    } else {
      await interaction.reply({
        content: `Command ${interaction.commandName} ${subcommand} doesn't exist`,
        ephemeral: true,
      });
    }
  }

  addSlashSubcommand(
    input: (subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => void,
  ): SlashCommandSubcommandsOnlyBuilder {
    const subcommand = input(new SlashCommandSubcommandBuilder());
    this.subcommands[subcommand.name] = execute;
    return super.addSubcommand(subcommand);
  }
}
