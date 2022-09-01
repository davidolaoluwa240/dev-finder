// Helpers
import { getJSON, profileTransformer, catchAsyncThrow } from "./helper";

// Configs
import { GITHUB_URL } from "./config";

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
const fetchGithubProfile = catchAsyncThrow(
  async function (searchTerm: string): Promise<any> {
    // 1) Update The Query State
    this.search.query = searchTerm;

    // 2) When there's no search term then return early
    if (!searchTerm) return;

    // 3) Fetch User Github Profile
    const profile = profileTransformer(
      await getJSON(`${GITHUB_URL}${searchTerm}`)
    );

    // 4) Update Search Result
    this.search.result = profile;
  }.bind(state)
);

export { state, fetchGithubProfile };
