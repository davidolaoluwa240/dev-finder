// View
import View from "./View";

/**
 * @class
 */
class ThemeView extends View<string> {
  constructor() {
    super(document.querySelector(".nav__theme") as HTMLElement);
    this.data = "light";
  }

  /**
   * Publisher that register an event and call the subscriber/handler function when the event happens
   * @param handler Handler to be called when click event happens on the parent element
   */
  public addHandlerClick(handler: () => void): void {
    this.parentEl.addEventListener("click", handler);
  }

  /**
   * Perform toggling of theme, changing of theme button text and updating of page theme
   */
  public render(): void {
    this.toggleTheme();
    this.updateThemeText();
    this.updatePageTheme();
  }

  /**
   * Toggle theme
   * @access private
   */
  private toggleTheme(): void {
    this.data = this.data === "light" ? "dark" : "light";
  }

  /**
   * Update theme button text base on current theme value
   * @access private
   */
  private updateThemeText(): void {
    (
      this.parentEl.querySelector(".nav__theme-text") as HTMLElement
    ).textContent = this.data;
  }

  /**
   * Update page theme
   * @access private
   */
  private updatePageTheme(): void {
    (this.parentEl.closest("html") as HTMLElement)?.setAttribute(
      "data-theme",
      this.data
    );
  }

  /**
   * @ignore
   */
  protected generateMarkup(): string {
    throw new Error("Method should not be used");
  }
}

export default new ThemeView();
