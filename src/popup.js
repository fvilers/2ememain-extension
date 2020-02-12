"use strict";

const showAdsOnHomePage = document.querySelector("#showAdsOnHomePage");
const showAdsInSearchResults = document.querySelector(
  "#showAdsInSearchResults"
);
const showAffiliateLinksOnItemsPage = document.querySelector(
  "#showAffiliateLinksOnItemsPage"
);

// Set current value
const setCurrentValue = (key, element) => {
  chrome.storage.local.get([key], result => {
    if (result[key]) {
      element.setAttribute("checked", "checked");
    } else {
      element.removeAttribute("checked");
    }
  });
};
setCurrentValue("showAdsOnHomePage", showAdsOnHomePage);
setCurrentValue("showAdsInSearchResults", showAdsInSearchResults);
setCurrentValue("showAffiliateLinksOnItemsPage", showAffiliateLinksOnItemsPage);

// Listen for changes
const listenForChange = (key, element, functionName) => {
  element.addEventListener("change", event => {
    const { checked } = event.target;

    chrome.storage.local.set({ [key]: checked });
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `${functionName}(${checked});`
      });
    });
  });
};
listenForChange("showAdsOnHomePage", showAdsOnHomePage, "toggleAdsOnHomePage");
listenForChange(
  "showAdsInSearchResults",
  showAdsInSearchResults,
  "toggleAdsInSearchResults"
);
listenForChange(
  "showAffiliateLinksOnItemsPage",
  showAffiliateLinksOnItemsPage,
  "toggleAffiliateLinksOnItemsPage"
);
