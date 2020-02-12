const show = element => {
  if (element) {
    element.style.display = "";
  }
};

const hide = element => {
  if (element) {
    element.style.display = "none";
  }
};

const toggleAdsOnHomePage = force => {
  const feedItems = document.querySelectorAll(".mp-Listing-card.feed-item");
  const ads = Array.from(feedItems).filter(item => {
    const price = item.querySelector(".price-new");

    return (
      price.textContent === "Voir description" ||
      price.textContent === "Zie omschrijving"
    );
  });

  ads.forEach(force ? show : hide);
};

const toggleAdsInSearchResults = force => {
  const listItems = document.querySelectorAll(
    ".mp-Listing.mp-Listing--list-item"
  );
  const ads = Array.from(listItems).filter(item =>
    item.querySelector(".mp-Listing-seller-link")
  );

  ads.forEach(force ? show : hide);
};

const toggleAffiliateLinksOnItemsPage = force => {
  const vipListings = document.querySelector("#vip-right-cas-listings");

  if (force) {
    show(vipListings);
  } else {
    hide(vipListings);
  }
};

// Watch for changes being made to the DOM tree
const targetNode = document.querySelector("body");
const config = { attributes: true, childList: true, subtree: true };
const callback = () => {
  chrome.storage.local.get(["showAdsOnHomePage"], result => {
    toggleAdsOnHomePage(result.showAdsOnHomePage);
  });
  chrome.storage.local.get(["showAdsInSearchResults"], result => {
    toggleAdsInSearchResults(result.showAdsInSearchResults);
  });
  chrome.storage.local.get(["showAffiliateLinksOnItemsPage"], result => {
    toggleAffiliateLinksOnItemsPage(result.showAffiliateLinksOnItemsPage);
  });
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
