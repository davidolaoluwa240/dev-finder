// Config
import { FETCH_TIMEOUT_SEC } from "./config";

// Interface
import { ProfileTransformer, Profile } from "./interface/profile.interface";

/**
 * Fetch Timeout Promise
 * @param sec Number of seconds until the promise is rejected
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
 * Invoke an async function and handle any async error
 * @param cb Async function to be invoked
 * @param errcb Error callback function
 */
const catchAsync = function (cb, errcb: (message: string) => void) {
  return async function (...data) {
    try {
      return await cb(...data);
    } catch (err) {
      errcb(`${err.message}💥💥💥`);
    }
  };
};

/**
 * Invoke an async function and re-throw any error that occur inside the async function
 * @param cb Async function to be invoked
 */
const catchAsyncThrow = function (cb) {
  return async function (...data): Promise<any> {
    try {
      return await cb(...data);
    } catch (err) {
      throw err;
    }
  };
};

/**
 * Custom Fetch Hook
 * @param url Url to make request to
 */
const getJSON = catchAsyncThrow(async function (url: string): Promise<any> {
  const response = await Promise.race([fetch(url), timeout(FETCH_TIMEOUT_SEC)]);
  if (response.status === 500)
    throw new Error("Something went wrong. Please try again later");
  if (response.status === 404)
    throw new Error("Could get the resource you are trying to fetch");
  const data = await response.json();
  return data;
});

/**
 * Transform Fetched Profile Data
 * @param profile Fetched User Profile Data
 */
const profileTransformer = function (profile: Profile): ProfileTransformer {
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

/**
 * Format any date to a country locale
 * @param locale Country locale (Default: 'en-GB')
 * @param date Date object to be formatted
 * @example dateFormatter("en-US", new Date())
 */
const dateFormatter = function (locale: string = "en-GB", date: Date): string {
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export {
  getJSON,
  profileTransformer,
  dateFormatter,
  catchAsync,
  catchAsyncThrow,
};
