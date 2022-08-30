// Views
import themeView from "./view/themeView";

/**
 * Controller for theming
 * @returns {undefined} void
 */
const controlTheme = function (): void {
  themeView.render();
};

/**
 * Called when the application is loaded
 */
const init = function (): void {
  themeView.addHandlerClick(controlTheme);
};

// Bootstrap application
init();
