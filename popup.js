document.getElementById("scrape-button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scrapeData" });
  });
});

// link to test : https://www.freecodecamp.org/news/html-tables-table-tutorial-with-css-example-code/
