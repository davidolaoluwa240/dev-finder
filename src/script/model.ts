// Helpers
import { getJSON, transformPropertyToCamelCase } from "./helper";

// Configs
import { GITHUB_URL } from "./config";

// Interfaces
import { Profile, ProfileTransformer } from "./interface/profile";

// Assets
import userPlaceholderImage from "url:../image/user.png";

/**
 * Application State
 */
const state: { search: { query: string; result: ProfileTransformer } } = {
  search: {
    query: "",
    result: {
      avatarUrl: userPlaceholderImage,
      login: "octocat",
      name: "The Octocat",
      createdAt: "2022-09-19T10:45:33.454Z",
      bio: "This profile has no bio",
      publicRepos: 8,
      followers: 6734,
      following: 9,
      location: "San Francisco",
      blog: "https://github.blog",
      twitterUsername: "Not available",
      company: "@github",
    },
  },
};

/**
 * Fetch User Github Profile
 * @param searchTerm Github username
 */
const fetchGithubProfile = async function (searchTerm: string): Promise<void> {
  // 1) Update the query state
  this.search.query = searchTerm;

  // 2) When there's no search term then return early
  if (!searchTerm) return;

  // 3) Fetch user github profile
  const response = await getJSON<Profile>(`${GITHUB_URL}/${searchTerm}`);

  // 4) If response is undefined throw an error
  if (!response)
    throw new Error(`User with the username ${searchTerm} do not exist`);

  // 5) Transform fetched data property to camelCase
  const profile = transformPropertyToCamelCase<Profile, ProfileTransformer>(
    response
  );

  // 6) Update Search Result State
  this.search.result = profile;
};

export { state, fetchGithubProfile };
