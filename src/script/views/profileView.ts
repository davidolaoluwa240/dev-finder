// View
import View from "./View";

// Interface
import { ProfileTransformer } from "../interface/profile.interface";

// Helpers
import { dateFormatter } from "../helper";

// Assets
import userPlaceholderImage from "url:../../image/user.png";

/**
 * @class
 */
class ProfileView extends View<ProfileTransformer> {
  constructor() {
    super(document.querySelector(".search-result") as HTMLElement);
  }

  /**
   * Publisher function that register an event and call the callback function when it happens
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
              src="${
                this.data.avatarUrl ? this.data.avatarUrl : userPlaceholderImage
              }"
              alt="${this.data.username}"
            />
          </div>
          <div class="search-result__right">
            <h2 class="search-result__name">${
              this.data.name ? this.data.name : "The Octocat"
            }</h2>
            <p class="search-result__username">@${
              this.data.username ? this.data.username : "octocat"
            }</p>
            <p class="search-result__timestamp">Joined ${dateFormatter(
              undefined,
              this.data.createdAt
            )}</p>
            <p class="search-result__bio">${
              this.data.bio ? this.data.bio : "This profile has no bio"
            }</p>
            <div class="search-result__info-box">
              <div class="search-result__info-item">
                <p class="search-result__info-title">Repos</p>
                <p class="search-result__info-number">${
                  this.data.publicRepos ? this.data.publicRepos : 8
                }</p>
              </div>
              <div class="search-result__info-item">
                <p class="search-result__info-title">Followers</p>
                <p class="search-result__info-number">${
                  this.data.followers ? this.data.followers : 6734
                }</p>
              </div>
              <div class="search-result__info-item">
                <p class="search-result__info-title">Following</p>
                <p class="search-result__info-number">
                ${this.data.following ? this.data.following : 9}
                </p>
              </div>
            </div>
            <a class="search-result__profile is-cursor-default">
              <i
                class="fa-solid fa-location-dot search-result__profile-icon"
              ></i>
              ${this.data.location ? this.data.location : "San Francisco"}
            </a>
            <a
              class="search-result__profile"
              href="${this.data.blogUrl ? this.data.blogUrl : "#"}"
              rel="noreferrer noopener"
              target="_blank"
            >
              <i class="fa-solid fa-link search-result__profile-icon"></i>
              ${this.data.blogUrl ? this.data.blogUrl : "https://github.blog"}
            </a>
            <a
              class="search-result__profile"
              href=" ${
                this.data.twitterUsername
                  ? `https://twitter.com/${this.data.twitterUsername}`
                  : "#"
              }"
              rel="noreferrer noopener"
              target="_blank"
            >
              <i class="fa-brands fa-twitter search-result__profile-icon"></i>
                ${
                  this.data.twitterUsername
                    ? this.data.twitterUsername
                    : "Not available"
                }
            </a>
            <a class="search-result__profile is-cursor-default">
              <i class="fa-solid fa-building search-result__profile-icon"></i>
              ${this.data.company ? this.data.company : "@github"}
            </a>
          </div>
    `;
    return markup;
  }
}

export default new ProfileView();
