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
   * Get Search Term
   */
  get searchTerm(): string {
    return this.data;
  }

  /**
   * Publisher Function
   * @param handler Handler to be called when submit event happen on the parent element
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
    const searchControl = this.parentEl.querySelector(
      ".search__form-control"
    ) as HTMLInputElement;
    searchControl.value = "";
  }
}

export default SearchView;
