export type SubscribedUserType = {
  username: string;
  email: string;
  confirmed: boolean;
  confirmed_at: Date | null;
  unsubscribed: boolean;
  unsubscribed_at: Date | null;
  created_at: Date;
  token: string;
};
