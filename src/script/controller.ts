// Modules
import "core-js/stable";
import "regenerator-runtime/runtime";

// Model
import * as Model from "./model";

// Interface
import { ProfileTransformer } from "./interface/profile.interface";

// Helpers
import { catchAsync } from "./helper";

// Views
import themeView from "./views/themeView";
import searchView from "./views/searchView";
import profileView from "./views/profileView";

/**
 * Controller for theming
 */
const controlTheme = function (): void {
  themeView.render();
};

/**
 * Controller for profile
 */
const controlProfile = catchAsync(async function (): Promise<void> {
  // 1) Get Search Term
  const searchTerm = searchView.searchTerm;

  // 2) Render Loading Spinner
  profileView.renderSpinner();

  // 3) Fetch Profile
  await Model.fetchGithubProfile(searchTerm);

  // 4) Render Fetched Profile
  profileView.render(Model.state.search.result as ProfileTransformer);

  // 5) Clear The Input Value
  searchView.clearInput();
}, profileView.renderError.bind(profileView));

/**
 * Called when the application is loaded
 */
const init = function (): void {
  themeView.addHandlerClick(controlTheme);
  searchView.addHandlerFormSubmit(controlProfile);
  profileView.addHandlerLoad(controlProfile);
};

// Bootstrap application
init();
