/**
 * Transformed Profile Interface
 */
export interface ProfileTransformer {
  name: string;
  avatarUrl: string;
  createdAt: string;
  company: string;
  followers: number;
  following: number;
  twitterUsername: string;
  bio: string;
  blog: string;
  publicRepos: number;
  location: string;
  login: string;
}

/**
 * Profile Interface
 */
export interface Profile {
  name: string;
  avatar_url: string;
  created_at: string;
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
