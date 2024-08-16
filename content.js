chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeData") {
    scrapeData();
  }
});

function scrapeData() {
  const tables = document.querySelectorAll("table");
  let csvContent = "data:text/csv;charset=utf-8,";
  console.log("inside scrape data");

  tables.forEach((table, index) => {
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

    // Add a blank row to separate tables
    if (index < tables.length - 1) {
      csvContent += "\r\n";
    }
  });

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "scraped_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
