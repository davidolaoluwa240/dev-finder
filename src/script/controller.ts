// Modules
import "core-js/stable";
import "regenerator-runtime/runtime";

// Model
import * as Model from "./model";

// Interface
import { ProfileTransformer } from "./interface/profile";

// Helpers
import { catchAsync } from "./helper";

// Views
import ThemeView from "./views/ThemeView";
import SearchView from "./views/SearchView";
import ProfileView from "./views/ProfileView";

// Views Instance
const themeView = new ThemeView();
const searchView = new SearchView();
const profileView = new ProfileView();

/**
 * Controller For Theming
 */
const controlTheme = function (): void {
  themeView.render();
};

/**
 * Controller For Profile
 */
const controlProfile = catchAsync(async function (): Promise<void> {
  // 1) Get search term
  const searchTerm = searchView.searchTerm;

  // 2) Render loading spinner
  profileView.renderSpinner();

  // 3) Fetch profile
  await Model.fetchGithubProfile.call(Model.state, searchTerm);

  // 4) Render fetched profile
  profileView.render(Model.state.search.result as ProfileTransformer);

  // 5) Clear the input value
  searchView.clearInput();
}, profileView.renderError.bind(profileView));

/**
 * Main
 */
const init = function (): void {
  themeView.addHandlerClick(controlTheme);
  searchView.addHandlerFormSubmit(controlProfile);
  profileView.addHandlerLoad(controlProfile);
};

// Bootstrap Application
init();
