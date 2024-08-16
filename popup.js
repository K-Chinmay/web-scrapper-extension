document.getElementById("scrape-button")?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: ["content.js"], // Injects the content script
      },
      () => {
        // Send a message to the content script after it's injected
        chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeData" });
      }
    );
  });
});
