/**
 * @abstract
 */
abstract class View<T> {
  /**
   * Parent Element Where Content Will Be Rendered
   * @access protected
   */
  protected parentEl: HTMLElement;

  /**
   * View data
   * @access protected
   */
  protected data: T;

  constructor(parentEl: HTMLElement) {
    this.parentEl = parentEl;
  }

  /**
   * Render Any Data To The DOM Using The Parent Element
   * @param data Data that should be rendered to the DOM
   */
  public render(data: T): void {
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Responsible For Returning The Markup That Will Be Rendered To The DOM
   * @access protected
   */
  protected generateMarkup(): string {
    return "";
  }

  /**
   * Clear Everything Inside The Parent Element
   * @access private
   */
  private clear(): void {
    this.parentEl.innerHTML = "";
  }

  /**
   * Render Any Error To The DOM
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
   * Render Loading Spinner To The DOM
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
