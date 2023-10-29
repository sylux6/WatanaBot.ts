import { SlashCommand } from '../types/slash-command';
import { avatarCommand } from './fun/avatar';
import { hentaiCommand } from './fun/hentai';
import { lewdCommand } from './fun/lewd';
import { rollCommand } from './fun/roll';

export const REEXPORTED_COMMANDS: Record<string, SlashCommand> = {
  [rollCommand.name]: rollCommand,
  [lewdCommand.name]: lewdCommand,
  [hentaiCommand.name]: hentaiCommand,
  [avatarCommand.name]: avatarCommand,
};
