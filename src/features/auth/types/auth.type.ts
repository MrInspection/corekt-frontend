export type User = {
  email: string;
  username: string;
};

export type Account = {
  expiresAt: number;
  token: string;
  user: User;
};
