import { SlashCommand } from '../types/slash-command';
import { AvatarCommand } from './fun/avatar';
import { HentaiCommand } from './fun/hentai';
import { LewdCommand } from './fun/lewd';
import { RollCommand } from './fun/roll';

export const REEXPORTED_COMMANDS: Record<string, SlashCommand> = {
  [RollCommand.getInstance().name]: RollCommand.getInstance(),
  [LewdCommand.getInstance().name]: LewdCommand.getInstance(),
  [HentaiCommand.getInstance().name]: HentaiCommand.getInstance(),
  [AvatarCommand.getInstance().name]: AvatarCommand.getInstance(),
};
