"use strict";

const setDefaultValue = (key, value) => {
  chrome.storage.local.get([key], result => {
    if (result[key] === undefined) {
      chrome.storage.local.set({ [key]: value });
    }
  });
};

const handleInstalled = () => {
  setDefaultValue("showAdsOnHomePage", true);
  setDefaultValue("showAdsInSearchResults", true);
  setDefaultValue("showAffiliateLinksOnItemsPage", true);

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.2ememain.be" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "www.2dehands.be" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
};

chrome.runtime.onInstalled.addListener(handleInstalled);
