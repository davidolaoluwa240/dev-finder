/**
 * @class
 */
class ThemeView {
  /**
   * @access protected
   */
  protected data = "light";
  /**
   * @access protected
   */
  protected parentEl = document.querySelector(".nav__theme") as HTMLElement;

  /**
   * Publisher that register an event and call the subscriber/handler function when the event happens
   * @param handler Called when click event happens on the parent element
   * @returns {undefind} void
   */
  public addHandlerClick(handler: () => void): void {
    this.parentEl.addEventListener("click", handler);
  }

  /**
   * Perform toggling of theme, changing of theme button text and updating of page theme
   * @returns {undefind} void
   */
  public render(): void {
    this.toggleTheme();
    this.updateThemeText();
    this.updatePageTheme();
  }

  /**
   * Toggle theme
   * @returns {undefined} void
   * @access private
   */
  private toggleTheme(): void {
    this.data = this.data === "light" ? "dark" : "light";
  }

  /**
   * Update theme button text base on current theming value
   * @returns {undefined} void
   * @access private
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
   * @access private
   */
  private updatePageTheme(): void {
    const documentEl: HTMLElement = this.parentEl.closest(
      "html"
    ) as HTMLElement;
    documentEl?.setAttribute("data-theme", this.data);
  }
}

export default new ThemeView();
