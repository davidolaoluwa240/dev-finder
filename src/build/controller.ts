// Modules
import "core-js/stable";
import "regenerator-runtime/runtime";

// Model
import * as Model from "./model";

// Views
import themeView from "./views/themeView";
import searchView from "./views/searchView";
import profileView from "./views/profileView";

/**
 * Controller for theming
 * @returns {undefined} void
 */
const controlTheme = function (): void {
  themeView.render();
};

/**
 * Controller For Profile
 * @param searchTerm Profile to be search for
 * @returns {undefined} void
 */
const controlProfile = async function (searchTerm: string): Promise<any> {
  // 1) Render Loading Spinner
  profileView.renderSpinner();

  // 2) Fetch Profile
  await Model.fetchGithubProfile(searchTerm);

  // 3) Render Fetched Profile
  profileView.render(Model.state.search.result);

  // 4) Clear The Input Value
  searchView.clear();
};

/**
 * Called when the application is loaded
 * @returns {undefined} void
 */
const init = function (): void {
  themeView.addHandlerClick(controlTheme);
  searchView.addHandlerFormSubmit(controlProfile);
  profileView.addHandlerLoad(controlProfile);
};

// Bootstrap application
init();
