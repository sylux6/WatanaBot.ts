import { SlashCommand } from '../types/slash-command';
import { AdminCommand } from './admin/admin';
import { BirthdayCommand } from './birthday/birthday';
import { AvatarCommand } from './fun/avatar';
import { HentaiCommand } from './fun/hentai';
import { LewdCommand } from './fun/lewd';
import { RollCommand } from './fun/roll';

const REEXPORTED_COMMANDS: (typeof SlashCommand)[] = [
  RollCommand,
  LewdCommand,
  HentaiCommand,
  AvatarCommand,
  BirthdayCommand,
  AdminCommand,
];

export const ALL_COMMANDS: Record<string, SlashCommand> = Object.fromEntries(
  REEXPORTED_COMMANDS.map(command => {
    const commandInstance = new command();
    return [commandInstance.name, commandInstance];
  }),
);
