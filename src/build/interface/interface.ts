// Interface
export interface Profile {
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
  company: string | null;
  followers: number;
  following: number;
  twitterUsername: string | null;
  bio: string | null;
  blogUrl: string | null;
  publicRepos: number;
  location: string | null;
  username: string;
}
