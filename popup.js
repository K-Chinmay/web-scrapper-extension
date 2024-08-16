document.getElementById("scrape-button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "scrapeData",
      preview: false,
    });
  });
});

document.getElementById("preview-button").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "scrapeData",
      preview: true,
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "displayPreview") {
    // Open a new window for the preview
    chrome.windows.create(
      {
        url: chrome.runtime.getURL("preview.html"),
        type: "popup",
        width: 800,
        height: 600,
      },
      (newWindow) => {
        // Once the window is created, send the CSV content to the new window
        setTimeout(() => {
          chrome.runtime.sendMessage({
            action: "populatePreview",
            csvContent: request.csvContent,
          });
        }, 500); // Delay to ensure the window is fully loaded
      }
    );
  }
});

// Listen for the message to populate the CSV preview
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "populatePreview") {
//     const csvContentElement = document.getElementById("csv-content");
//     csvContentElement.textContent = request.csvContent;
//   }
// });

// document.getElementById("close-modal").addEventListener("click", () => {
//   window.close(); // Close the modal window when the button is clicked
// });

// link to test : https://www.freecodecamp.org/news/html-tables-table-tutorial-with-css-example-code/
