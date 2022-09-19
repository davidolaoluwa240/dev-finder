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
   * Publisher Function
   * @param handler Handler to be called when click event happens on the parent element
   */
  public addHandlerClick(handler: () => void): void {
    this.parentEl.addEventListener("click", handler);
  }

  /**
   * Perform Toggling Of Theme, Changing Of Theme Button Text And Updating Of Page Theme
   */
  public render(): void {
    this.data = this.toggleTheme();
    this.updateThemeText();
    this.updatePageTheme();
  }

  /**
   * Toggle Theme
   * @access private
   */
  private toggleTheme(): string {
    return this.data === "light" ? "dark" : "light";
  }

  /**
   * Update Theme Button Text
   * @access private
   */
  private updateThemeText(): void {
    const themeText = this.parentEl.querySelector(
      ".nav__theme-text"
    ) as HTMLElement;
    themeText.textContent = this.toggleTheme();
  }

  /**
   * Update Page Theme
   * @access private
   */
  private updatePageTheme(): void {
    const rootEl = this.parentEl.closest("html") as HTMLElement;
    rootEl?.setAttribute("data-theme", this.data);
  }
}

export default ThemeView;
