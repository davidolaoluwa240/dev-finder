// View
import View from "./View";

// Interface
import { ProfileTransformer } from "../interface/profile";

// Helpers
import { dateFormatter } from "../helper";

/**
 * @class
 */
class ProfileView extends View<ProfileTransformer> {
  constructor() {
    super(document.querySelector(".search-result") as HTMLElement);
  }

  /**
   * Publisher Function
   * @param handler Handler to be called on page load
   */
  addHandlerLoad(handler: () => void): void {
    document.addEventListener("DOMContentLoaded", handler);
  }

  protected generateMarkup(): string {
    const markup = `
        <div class="search-result__left">
            <img
              class="search-result__photo"
              src="${this.data.avatarUrl}"
              alt="${this.data.login}"
            />
          </div>
          <div class="search-result__right">
            <h2 class="search-result__name">${this.data.name}</h2>
            <p class="search-result__username">@${this.data.login}</p>
            <p class="search-result__timestamp">Joined ${dateFormatter(
              undefined,
              new Date(this.data.createdAt)
            )}</p>
            <p class="search-result__bio">${this.data.bio}</p>
            <div class="search-result__info-box">
              <div class="search-result__info-item">
                <p class="search-result__info-title">Repos</p>
                <p class="search-result__info-number">${
                  this.data.publicRepos
                }</p>
              </div>
              <div class="search-result__info-item">
                <p class="search-result__info-title">Followers</p>
                <p class="search-result__info-number">${this.data.followers}</p>
              </div>
              <div class="search-result__info-item">
                <p class="search-result__info-title">Following</p>
                <p class="search-result__info-number">
                ${this.data.following}
                </p>
              </div>
            </div>
            <a class="search-result__profile is-cursor-default">
              <i
                class="fa-solid fa-location-dot search-result__profile-icon"
              ></i>
              ${this.data.location}
            </a>
            <a
              class="search-result__profile"
              href="${this.data.blog}"
              rel="noreferrer noopener"
              target="_blank"
            >
              <i class="fa-solid fa-link search-result__profile-icon"></i>
              ${this.data.blog}
            </a>
            <a
              class="search-result__profile"
              href=" ${`https://twitter.com/${this.data.twitterUsername}`}"
              rel="noreferrer noopener"
              target="_blank"
            >
              <i class="fa-brands fa-twitter search-result__profile-icon"></i>
                ${this.data.twitterUsername}
            </a>
            <a class="search-result__profile is-cursor-default">
              <i class="fa-solid fa-building search-result__profile-icon"></i>
              ${this.data.company}
            </a>
          </div>
    `;
    return markup;
  }
}

export default ProfileView;
