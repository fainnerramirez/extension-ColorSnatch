
chrome.runtime.onInstalled.addListener(() => {
  console.log("La extensión de colorSnatch ha sido instalada.");
});

chrome.action.setBadgeText({text: 'ON'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});