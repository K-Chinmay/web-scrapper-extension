// Listen for the message to populate the CSV preview
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "populatePreview") {
    const csvContentElement = document.getElementById("csv-content");
    const rows = request.csvContent.split("\n");
    console.log("rows", rows);
    rows.forEach((row, index) => {
      const rowElement = document.createElement("div");
      rowElement.className = "csv-row";

      const cells = row.split(",");
      cells.forEach((cell) => {
        const cellElement = document.createElement("div");
        cellElement.className = "csv-cell";
        cellElement.textContent = cell.trim();

        rowElement.appendChild(cellElement);
      });

      csvContentElement.appendChild(rowElement);
    });
  }
});

document.getElementById("close-modal").addEventListener("click", () => {
  window.close();
});
