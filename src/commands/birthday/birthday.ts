import { format, isValid, parse } from 'date-fns';
import {
  APIApplicationCommandOptionChoice,
  ChatInputCommandInteraction,
  EmbedBuilder,
  User,
} from 'discord.js';
import { groupBy } from 'lodash';

import { db, PRIMARY_COLOR } from '../../client/client';
import { createBotEmbed, getDefaultInteractionOptionMember } from '../../client/utils';
import { ReplyType } from '../../types/reply-type';
import { SlashCommandGroup } from '../../types/slash-command-group';

export class BirthdayCommand extends SlashCommandGroup {
  name = 'birthday';
  description = 'Birthday commands';

  monthChoices: APIApplicationCommandOptionChoice<number>[] = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];

  constructor() {
    super();
    this.addSlashSubcommand(
      command =>
        command
          .setName('get')
          .setDescription('Get birthday of a member')
          .addUserOption(option =>
            option.setName('member').setDescription('The member to get the birthday'),
          ),
      this.getBirthday,
    );
    this.addSlashSubcommand(
      command =>
        command
          .setName('set')
          .setDescription('Set birthday of a member')
          .addIntegerOption(option =>
            option
              .setName('day')
              .setDescription('Day of birthday')
              .setMinValue(1)
              .setMaxValue(31)
              .setRequired(true),
          )
          .addIntegerOption(option =>
            option
              .setName('month')
              .setDescription('Month of birthday')
              .addChoices(...this.monthChoices)
              .setRequired(true),
          )
          .addUserOption(option =>
            option.setName('member').setDescription('The member to get the birthday'),
          ),
      this.setBirthday,
    );
    this.addSlashSubcommand(
      command =>
        command
          .setName('month')
          .setDescription('Get birthdays in a given month')
          .addIntegerOption(option =>
            option
              .setName('month')
              .setDescription('Month to retrieve birthdays')
              .addChoices(...this.monthChoices),
          ),
      this.getBirthdays,
    );
  }

  private async getBirthday(interaction: ChatInputCommandInteraction) {
    const member = getDefaultInteractionOptionMember(interaction, 'member');
    const user = await db.users.findUnique({
      where: { userId: member.id },
    });
    if (user && user.birthdayMonth && user.birthdayDay) {
      const birthday = parse(`${user.birthdayDay} ${user.birthdayMonth}`, 'd M', new Date());
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: member.displayName,
              iconURL: member.user.avatarURL({ size: 32 })!,
            })
            .setDescription(`🎂 ${format(birthday, 'do')} of ${format(birthday, 'LLLL')}`)
            .setColor(PRIMARY_COLOR),
        ],
      });
    } else {
      await interaction.reply({
        content: `${member.displayName} has not set their birthday`,
      });
    }
  }

  private async setBirthday(interaction: ChatInputCommandInteraction) {
    const birthdayDay = interaction.options.getInteger('day', true);
    const birthdayMonth = interaction.options.getInteger('month', true);
    const birthday = parse(`${birthdayDay} ${birthdayMonth}`, 'd M', new Date());

    // Date validation
    if (!isValid(birthday)) {
      await interaction.reply({
        embeds: [
          createBotEmbed({
            description: 'Invalid date',
            replyType: ReplyType.ERROR,
          }),
        ],
        ephemeral: true,
      });
      return;
    }

    const member = getDefaultInteractionOptionMember(interaction, 'member');

    // Permissions validation
    if (member.id !== interaction.user.id) {
      const owner: User = (await interaction.client.application.fetch()).owner as User;

      if (
        interaction.member?.user.id !== interaction.guild?.ownerId &&
        interaction.member?.user.id !== owner.id
      ) {
        await interaction.reply({
          embeds: [
            createBotEmbed({
              description: "You don't have enough permissions to set a birthday for another member",
              replyType: ReplyType.ERROR,
            }),
          ],
          ephemeral: true,
        });
        return;
      }
    }

    await db.users.upsert({
      create: { userId: member.id, birthdayDay, birthdayMonth },
      update: { birthdayDay, birthdayMonth },
      where: { userId: member.id },
    });

    await interaction.reply({
      embeds: [
        createBotEmbed({
          description: `${member} birthday is set to the ${format(birthday, 'do')} of ${format(
            birthday,
            'LLLL',
          )}`,
        }),
      ],
      ephemeral: true,
    });
  }

  private async getBirthdays(interaction: ChatInputCommandInteraction) {
    const birthdayMonth = interaction.options.getInteger('month') ?? new Date().getUTCMonth() + 1;

    const users = await db.users.findMany({
      where: { birthdayMonth, birthdayDay: { not: null } },
      select: { userId: true, birthdayDay: true },
      orderBy: { birthdayDay: 'asc' },
    });

    // Guild members among the selected users in database
    const memberDict = Object.fromEntries(
      (
        await interaction.guild!.members.fetch({
          user: users.map(({ userId }) => userId),
        })
      ).map(member => [member.id, member]),
    );

    const embed = new EmbedBuilder()
      .setColor(PRIMARY_COLOR)
      .setTitle(`Birthdays in ${format(parse(`${birthdayMonth}`, 'M', new Date()), 'LLLL')}`);

    Object.entries(
      groupBy(
        users.filter(({ userId }) => userId in memberDict),
        ({ birthdayDay }) => birthdayDay,
      ),
    ).forEach(([day, birthdayUsers]) =>
      embed.addFields({
        name: `🎂 ${format(parse(`${day} ${birthdayMonth}`, 'd M', new Date()), 'dd/MM')}`,
        value: birthdayUsers.map(({ userId }) => `${memberDict[userId]}`).join('\n'),
      }),
    );

    await interaction.reply({ embeds: [embed] });
  }
}
