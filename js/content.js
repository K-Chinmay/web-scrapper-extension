let selectedTables = new Set();

function addTableEventListeners() {
  const tables = document.querySelectorAll("table");

  tables.forEach((table) => {
    table.addEventListener("mouseover", handleMouseOver);
    table.addEventListener("mouseout", handleMouseOut);
    table.addEventListener("click", handleClick);
  });
}

function handleMouseOver(event) {
  console.log("handle mouse over called");
  event.target.classList.add("hovered");
}

function handleMouseOut(event) {
  console.log("handle mouse out called");
  event.target.classList.remove("hovered");
}

function handleClick(event) {
  console.log("event.target.tagName", event.target.tagName);
  // Traverse up the DOM to find the closest table element
  const table = event.target.closest("table");
  if (table) {
    const index = Array.from(document.querySelectorAll("table")).indexOf(table);

    if (selectedTables.has(index)) {
      selectedTables.delete(index);
      table.classList.remove("selected");
    } else {
      selectedTables.add(index);
      table.classList.add("selected");
    }
  }
  console.log("selectedTables", selectedTables);
}

// Call this function to add the event listeners when the content script runs
addTableEventListeners();

function scrapeData(preview = false) {
  const tables = document.querySelectorAll("table");
  let csvContent = "";

  selectedTables.forEach((index) => {
    const table = tables[index];
    const rows = table.querySelectorAll("tr");

    rows.forEach((row) => {
      const cols = row.querySelectorAll("td, th");
      const rowData = Array.from(cols)
        .map((col) => {
          let textContent = col.textContent.trim();
          textContent = `"${textContent}"`;

          if (col.tagName.toLowerCase() === "th") {
            textContent = `[${textContent}]`;
          }

          return textContent;
        })
        .join(",");

      csvContent += rowData + "\r\n";
    });

    csvContent += "\r\n"; // Separate tables with a blank row
  });

  if (preview) {
    // Send CSV content back to the popup for preview
    chrome.runtime.sendMessage({
      action: "displayPreview",
      csvContent: csvContent,
    });
  } else {
    // Download the CSV
    const link = document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURI(csvContent)
    );
    link.setAttribute("download", "scraped_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Listen for the message from the popup to either scrape data for download or preview
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeData") {
    scrapeData(request.preview);
  }
});
