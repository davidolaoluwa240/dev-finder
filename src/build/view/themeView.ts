// View
import View from "./View";

/**
 * @class
 */
class ThemeView extends View {
  /**
   * @access protected
   */
  protected data: string = "light";

  /**
   * @constructor
   */
  constructor() {
    super(document.querySelector(".nav__theme") as HTMLElement);
  }

  /**
   * Publisher that register an event and call the subscriber/handler function when the event happens
   * @param handler Called when thene click event happens on the parent element
   * @returns {undefind} void
   */
  public addHandlerClick(handler: () => void): void {
    this.parentEl.addEventListener("click", handler);
  }

  /**
   * Manage application theming
   * @returns {undefind} void
   */
  public render(): void {
    this.toggleTheme();
    this.updateThemeText();
    this.updatePageTheme();
  }

  /**
   * Toggle theming
   * @returns {undefined} void
   */
  private toggleTheme(): void {
    this.data = this.data === "light" ? "dark" : "light";
  }

  /**
   * Update theme button text base on current theming value
   * @returns {undefined} void
   */
  private updateThemeText(): void {
    const themeTextEl: HTMLElement = this.parentEl.querySelector(
      ".nav__theme-text"
    ) as HTMLElement;
    themeTextEl.textContent = this.data;
  }

  /**
   * Update page theme
   * @returns {undefined} void
   */
  private updatePageTheme(): void {
    const documentEl: HTMLElement = this.parentEl.closest(
      "html"
    ) as HTMLElement;
    documentEl?.setAttribute("data-theme", this.data);
  }

  protected generateMarkup(data: any): string {
    return "";
  }
}

export default new ThemeView();
