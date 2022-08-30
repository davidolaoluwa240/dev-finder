/**
 * @class
 */
class SearchView {
  /**
   * @access protected
   */
  protected parentEl = document.querySelector(
    ".search__form"
  ) as HTMLFormElement;

  /**
   * Publisher function that register an event and call the Subscriber when it happens
   * @param handler Function to be called when submit event happen on the parent element
   * @returns {undefined} void
   */
  public addHandlerFormSubmit(handler: (searchTerm: string) => void): void {
    this.parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchControl = this.parentEl.querySelector(
        ".search__form-control"
      ) as HTMLInputElement;
      handler(searchControl.value);
    });
  }

  /**
   * Clear input value
   * @returns {undefined} void
   */
  public clear(): void {
    const searchControl = this.parentEl.querySelector(
      ".search__form-control"
    ) as HTMLInputElement;
    searchControl.value = "";
  }
}

export default new SearchView();
