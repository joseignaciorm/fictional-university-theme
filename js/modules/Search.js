import $ from "jquery";

class Search {
  // 1. describe and create/initiate our object
  constructor() {
    this.addSearchHTML();
    this.openButton = $(".js-search-trigger");
    this.closeButton = $(".search-overlay__close");
    this.searchOverlay = $(".search-overlay");
    this.searchField = $("#search-term");
    this.events();
    this.isOverlayOpen = false;
    this.typingTimer;
    this.resultsDiv = $("#search-overlay__results");
    this.isSpinnerVisible = false;
    this.previousValue;
  }

  // 2. events
  events() {
    this.openButton.on("click", this.openOverlay.bind(this));
    this.closeButton.on("click", this.closeOverlay.bind(this));
    $(document).on("keydown", this.keyPressDispatcher.bind(this));
    this.searchField.on("keyup", this.typingLogic.bind(this));
  }

  // 3. methods (function, action...)
  // Managing time to send search request to WP server when user stops typing.
  typingLogic() {
    if (this.searchField.val() != this.previousValue) {
      clearTimeout(this.typingTimer);

      if (this.searchField.val()) {
        if (!this.isSpinnerVisible) {
          this.resultsDiv.html('<div class="spinner-loader"></div>');
          this.isSpinnerVisible = true;
        }
        this.typingTimer = setTimeout(this.getResults.bind(this), 750);
      } else {
        this.resultsDiv.html("");
        this.isSpinnerVisible = false;
      }
    }
    this.previousValue = this.searchField.val(); // Take the value. For example: Biology
  }

  // Geting results from Search Overlay
  getResults() {
    $.getJSON(
      universityData.root_url +
        "/wp-json/wp/v2/posts?search=" +
        this.searchField.val(),
      (response) => {
        this.resultsDiv.html(`
          <h2 class="search-overlay__section-title">General Information</h2>
          ${
            response.length
              ? '<ul class="link-list min-list">'
              : "<p>No general information matches that search.</p>"
          }
            ${response
              .map(
                (item) =>
                  `<li><a href="${item.link}">${item.title.rendered}</a></li>`
              )
              .join("")}
          ${response.length ? "</ul>" : ""}
        `);
        this.isSpinnerVisible = false;
      }
    );
  }

  // Open and close Search Overlay pushing key "ESC" to close it and key "S" to close it.
  keyPressDispatcher(e) {
    // s(keyCode)=83
    if (
      e.keyCode == 83 &&
      !this.isOverlayOpen &&
      !$("input, textarea").is(":focus")
    ) {
      this.openOverlay();
    }

    // esc(keyCode)=27
    if (e.keyCode == 27 && this.isOverlayOpen) {
      this.closeOverlay();
      this.searchField.blur();
    }
  }

  // To open Search Overlay and to hide vertical scroll
  openOverlay() {
    this.searchOverlay.addClass("search-overlay--active");
    $("body").addClass("body-no-scroll");
    this.searchField.val("");
    setTimeout(() => this.searchField.focus(), 301);
    this.isOverlayOpen = true;
  }

  // To close Search Overlay and to show vertical scroll
  closeOverlay() {
    this.searchOverlay.removeClass("search-overlay--active");
    $("body").removeClass("body-no-scroll");
    this.isOverlayOpen = false;
  }

  addSearchHTML() {
    $("body").append(`
      <div class="search-overlay">
        <div class="search-overlay--top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden=true></i>
            <input type="text" class="search-term" autocomplete="off" placeholder="What are you looking for?" id="search-term">
            <i class="fa fa-window-close search-overlay__close" aria-hidden=true></i>
          </div>
        </div>
      
        <div class="container">
          <div id="search-overlay__results"></div>
        </div>
      </div>
    `);
  }
}

export default Search;