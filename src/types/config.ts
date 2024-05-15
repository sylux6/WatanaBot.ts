export type Config = {
  token: string;
  clientId: string;
  privateGuildId?: string | undefined;
  postgresUser: string;
  postgresPassword: string;
  postgresDb: string;
};
