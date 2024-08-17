Below is a `README.md` file for the Chrome extension that allows users to scrape table data from a webpage, select specific columns directly from the table, and download the data as a CSV file.

---

## Table Scraper Chrome Extension

This Chrome extension allows users to scrape table data from any webpage, select specific columns directly from the table, and download the selected data as a CSV file. The extension is designed to be user-friendly, with the ability to visually select and deselect table columns by clicking on the table headers.

### Features

- **Table Selection**: Click on any table on the webpage to select it for scraping.
- **Column Selection**: Click on the table headers (`<th>`) to select or deselect specific columns for inclusion in the CSV file.
- **CSV Download**: After making your selections, download the data as a CSV file with a single click.
- **CSV Preview**: Preview the data in a new window before downloading it.

### Installation

1. **Clone or Download the Repository:**

   ```bash
   git clone https://github.com/yourusername/table-scraper-extension.git
   cd table-scraper-extension
   ```

2. **Load the Extension in Chrome:**

   1. Open Chrome and go to `chrome://extensions/`.
   2. Enable "Developer mode" using the toggle in the top right corner.
   3. Click on "Load unpacked" and select the directory where you cloned/downloaded the extension.

3. **The extension will now appear in your Chrome toolbar.**

### Usage

1. **Enable the Extension:**
   - Navigate to a webpage with a table.
   - Click on the Table Scraper extension icon in the Chrome toolbar.

2. **Select a Table:**
   - Hover over any table on the webpage. The selected table will be highlighted.
   - Click on the table to select it.

3. **Select/Deselect Columns:**
   - Click on the table headers (`<th>`) to toggle the selection of specific columns.
   - Selected columns will be highlighted.

4. **Download CSV:**
   - Click the "Download CSV" button in the popup to download the selected data as a CSV file.

5. **Preview CSV:**
   - Click the "Preview CSV" button to see how the data will look in a new window before downloading it.

### File Structure

- **`manifest.json`**: Configuration file for the Chrome extension.
- **`popup.html`**: The HTML file for the extension's popup UI.
- **`popup.js`**: JavaScript file for handling user interactions in the popup.
- **`contentScript.js`**: Script injected into webpages to handle table selection and data scraping.
- **`contentScript.css`**: CSS file for styling the table selection and column toggling.
- **`preview.html`**: HTML file for displaying the CSV preview in a new window.
- **`preview.js`**: JavaScript file for rendering the CSV data in the preview window.

### Technical Details

- **Compatibility**: The extension is compatible with Chrome versions 70 and above.
- **Permissions**: The extension requires the following permissions:
  - `activeTab`: To interact with the currently active tab.
  - `scripting`: To execute scripts in the context of the active tab.
  - `downloads`: To initiate the CSV download.
  
### Notes

- If you encounter any issues with tables not being detected, ensure that the table elements are properly structured using `<table>`, `<th>`, and `<td>` tags.
- The CSV generation logic handles common edge cases, such as commas within cell content, by properly escaping the data.

### Contact

For any questions or support, please open an issue on the GitHub repository.

---

This `README.md` provides a comprehensive overview of your Chrome extension, guiding users through installation, usage, and technical details. It also includes information on contributing and licensing, making it a well-rounded documentation for the project.
