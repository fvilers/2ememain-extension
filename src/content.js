const hide = element => {
  if (element) {
    element.style.display = "none";
  }
};

const removeHomepageAds = () => {
  const feedItems = document.querySelectorAll(".mp-Listing-card.feed-item");
  const ads = Array.from(feedItems).filter(item => {
    const link = item.querySelector("a.mp-Listing-card-clickable-container");

    return link && link.href ? !link.href.endsWith("&previousPage=home") : true;
  });

  ads.forEach(hide);
};

const removeSearchResultAds = () => {
  const listItems = document.querySelectorAll(
    ".mp-Listing.mp-Listing--list-item"
  );
  const ads = Array.from(listItems).filter(item =>
    item.querySelector(".mp-Listing-seller-link")
  );

  ads.forEach(hide);
};

const removeSideItemAds = () => {
  const vipListings = document.querySelector("#vip-right-cas-listings");

  hide(vipListings);
};

// Watch for changes being made to the DOM tree
const targetNode = document.querySelector("body");
const config = { attributes: true, childList: true, subtree: true };
const callback = () => {
  removeHomepageAds();
  removeSearchResultAds();
  removeSideItemAds();
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
