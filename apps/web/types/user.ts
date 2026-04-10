export type User = {
  id: string;
  email: string;
  googleId?: string | null;
  username?: string | null;
  name?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  coverImageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};
