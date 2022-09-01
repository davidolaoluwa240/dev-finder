/**
 * @abstract
 */
abstract class View<T> {
  /**
   * Responsible for returning the markup that will be rendered to the DOM
   * @access protected
   */
  protected abstract generateMarkup(): string;
  /**
   * View data
   * @access protected
   */
  protected data: T;

  constructor(protected parentEl: HTMLElement) {}

  /**
   * Render any data to the DOM using the parent element
   * @param data Data that should be rendered to the DOM
   */
  public render(data: T): void {
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Clear everything inside the parent element
   * @access private
   */
  private clear(): void {
    this.parentEl.innerHTML = "";
  }

  /**
   * Render any error to the DOM
   * @param message Error message to be rendered to the DOM
   */
  public renderError(message: string): void {
    const markup = `
        <div class="search-result__error">
            <p class="search-result__error-text is-text-center">
                ${message}
            </p>
        </div>
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Render loading spinner to the DOM
   */
  public renderSpinner(): void {
    const markup = `
        <div class="search-result__loading">
            <div class="sk-circle">
              <div class="sk-circle1 sk-child"></div>
              <div class="sk-circle2 sk-child"></div>
              <div class="sk-circle3 sk-child"></div>
              <div class="sk-circle4 sk-child"></div>
              <div class="sk-circle5 sk-child"></div>
              <div class="sk-circle6 sk-child"></div>
              <div class="sk-circle7 sk-child"></div>
              <div class="sk-circle8 sk-child"></div>
              <div class="sk-circle9 sk-child"></div>
              <div class="sk-circle10 sk-child"></div>
              <div class="sk-circle11 sk-child"></div>
              <div class="sk-circle12 sk-child"></div>
            </div>
          </div>
    `;
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }
}

export default View;
