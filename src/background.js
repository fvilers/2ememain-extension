"use strict";

const handleInstalled = () => {
  chrome.storage.local.set({ showAdsOnHomePage: true });
  chrome.storage.local.set({ showAdsInSearchResults: true });
  chrome.storage.local.set({ showAffiliateLinksOnItemsPage: true });

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
