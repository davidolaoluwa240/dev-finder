// View
import View from "./View";

/**
 * @class
 */
class SearchView extends View<string> {
  constructor() {
    super(document.querySelector(".search__form") as HTMLFormElement);
  }

  /**
   * Get search term
   */
  get searchTerm(): string {
    return this.data;
  }

  /**
   * Publisher function that register an event and call the Subscriber when it happens
   * @param handler Function to be called when submit event happen on the parent element
   */
  public addHandlerFormSubmit(handler: () => void): void {
    this.parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchControl = this.parentEl.querySelector(
        ".search__form-control"
      ) as HTMLInputElement;
      this.data = searchControl.value;
      handler();
    });
  }

  /**
   * Clear input value
   */
  public clearInput(): void {
    (
      this.parentEl.querySelector(".search__form-control") as HTMLInputElement
    ).value = "";
  }

  /**
   * @ignore
   */
  protected generateMarkup(): string {
    throw new Error("Method should not be used");
  }
}

export default new SearchView();
