// Helpers
import { getJSON, profileTransformer } from "./helper";

// Configs
import { BASE_URL } from "./config";

// Interface
import { Profile } from "./interface/interface";

/**
 * Application state
 */
const state = {
  search: {
    query: "",
    result: {
      name: "",
      avatarUrl: "",
      createdAt: new Date(),
      company: "",
      followers: 0,
      following: 0,
      twitterUsername: "",
      bio: "",
      blogUrl: "",
      publicRepos: 0,
      location: "",
      username: "",
    },
  },
};

/**
 * Fetch User Github Profile
 * @param searchTerm Profile to be search for
 * @returns {Promise} Promise that will be settled at one point in the future
 */
const fetchGithubProfile = async function (searchTerm: string): Promise<any> {
  // 1) Update The Query State
  this.search.query = searchTerm;

  // 2) When there's no search term then return early
  if (!searchTerm) return;

  // 3) Fetch User Github Profile
  const profile: Profile = profileTransformer(
    await getJSON(`${BASE_URL}${searchTerm}`)
  );

  // 4) Update Search Result
  this.search.result = profile;
}.bind(state);

export { state, fetchGithubProfile };
