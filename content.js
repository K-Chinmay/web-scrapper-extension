chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeData") {
    scrapeData();
  }
});

function scrapeData() {
  const rows = document.querySelectorAll("table tr");
  let csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach((row) => {
    const cols = row.querySelectorAll("td, th");
    const rowData = Array.from(cols)
      .map((col) => col.textContent.trim())
      .join(",");
    csvContent += rowData + "\r\n";
  });

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "scraped_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
