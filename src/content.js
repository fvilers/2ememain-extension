const removeHomepageAds = () => {
  const feedItems = document.querySelectorAll(".mp-Listing-card.feed-item");
  const ads = Array.from(feedItems).filter(item => {
    const link = item.querySelector("a.mp-Listing-card-clickable-container");

    return link && link.href ? !link.href.endsWith("&previousPage=home") : true;
  });

  ads.forEach(ad => ad.replaceWith(""));
};

const removeSearchResultAds = () => {
  const listItems = document.querySelectorAll(
    ".mp-Listing.mp-Listing--list-item"
  );
  const ads = Array.from(listItems).filter(item =>
    item.querySelector(".mp-Listing-seller-link")
  );

  ads.forEach(ad => ad.replaceWith(""));
};

// Watch for changes being made to the DOM tree
const targetNode = document.querySelector("body");
const config = { attributes: true, childList: true, subtree: true };
const callback = (mutationsList, observer) => {
  removeHomepageAds();
  removeSearchResultAds();
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
