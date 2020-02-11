// Watch for changes being made to the DOM tree
const targetNode = document.querySelector("body");
const config = { attributes: true, childList: true, subtree: true };
const callback = (mutationsList, observer) => {};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
