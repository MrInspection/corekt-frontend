export type User = {
  id: string;
  email: string;
  username: string;
  mistralToken: string;
};

export type Account = {
  expiresAt: number;
  token: string;
  user: User;
};
