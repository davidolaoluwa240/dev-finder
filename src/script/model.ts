// Helpers
import { getJSON, transformPropertyToCamelCase, catchAsync } from "./helper";

// Configs
import { GITHUB_URL } from "./config";

// Interface
import { Profile, ProfileTransformer } from "./interface/profile.interface";

/**
 * Application state
 */
const state = {
  search: {
    query: "",
    result: {},
  },
};

/**
 * Fetch User Github Profile
 * @param searchTerm Github username
 */
const fetchGithubProfile = catchAsync(
  async function (searchTerm: string): Promise<void> {
    // 1) Update The Query State
    this.search.query = searchTerm;

    // 2) When There's No Search Term Then Return Early
    if (!searchTerm) return;

    // 3) Fetch User Github Profile
    const response = await getJSON<Profile>(`${GITHUB_URL}${searchTerm}`);

    // 4) If Response Is Undefined Throw An Error
    if (!response)
      throw new Error(`User with the username ${searchTerm} do not exist`);

    // 5) Transform Fetched Data Property To CamelCase
    const profile = transformPropertyToCamelCase<Profile, ProfileTransformer>(
      response
    );

    // 6) Update Search Result State
    this.search.result = profile;
  }.bind(state)
);

export { state, fetchGithubProfile };
