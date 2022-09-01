/**
 * Transformed Profile Data Interface
 */
export interface ProfileTransformer {
  name: string;
  avatarUrl: string;
  createdAt: Date;
  company: string;
  followers: number;
  following: number;
  twitterUsername: string;
  bio: string;
  blogUrl: string;
  publicRepos: number;
  location: string;
  username: string;
}

/**
 * Fetched Github Profile Interface
 */
export interface Profile {
  name: string;
  avatar_url: string;
  created_at: Date;
  company: string;
  followers: number;
  following: number;
  twitter_username: string;
  bio: string;
  blog: string;
  public_repos: number;
  location: string;
  login: string;
}
