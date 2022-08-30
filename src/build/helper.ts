// Config
import { FETCH_TIMEOUT_SEC } from "./config";

// Interface
import { Profile } from "./interface/interface";

/**
 * Fetch Timeout Promise
 * @param sec Number of seconds until the promise is rejected
 * @returns {Promise} Promise that will be rejected at certain point in the future
 */
const timeout = function (sec: number): Promise<any> {
  return new Promise(function (_, reject) {
    setTimeout(
      reject.bind(null, new Error("Request took too long. Please try again")),
      sec * 1000
    );
  });
};

/**
 * Custom Fetch Hook
 * @param url Url to make request to
 */
const getJSON = async function (url: string): Promise<any> {
  const response = await Promise.race([fetch(url), timeout(FETCH_TIMEOUT_SEC)]);
  const data = await response.json();
  return data;
};

/**
 * Transform Fetched Profile Data
 * @param profile Fetched User Profile Data
 * @returns {Profile} Transformed Data
 */
const profileTransformer = function (profile: any): Profile {
  return {
    name: profile.name,
    avatarUrl: profile.avatar_url,
    createdAt: new Date(profile.created_at),
    company: profile.company,
    followers: profile.followers,
    following: profile.following,
    twitterUsername: profile.twitter_username,
    bio: profile.bio,
    blogUrl: profile.blog,
    publicRepos: profile.public_repos,
    location: profile.location,
    username: profile.login,
  };
};

const dateFormatter = function (locale, date) {};

export { getJSON, profileTransformer, dateFormatter };
