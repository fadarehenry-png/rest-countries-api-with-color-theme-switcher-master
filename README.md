REST Countries App
A Frontend Mentor Challenge Solution
Built with HTML, CSS & Vanilla JavaScript

Overview
This project is a solution to the REST Countries API with colour theme switcher challenge on Frontend Mentor. It fetches and displays data for 250 countries, allowing users to search, filter, and explore detailed information about each one.
Features
•Browse all 250 countries in a responsive card grid
•Search countries by name or capital city
•Filter countries by region (Africa, Americas, Asia, Europe, Oceania)
•Click any country card to view detailed information
•Navigate to border countries directly from the detail view
•Toggle between Light and Dark mode
•Skeleton loading placeholders while data loads

Project Structure
The project is intentionally kept simple — just two files:
index.html    ← All HTML, CSS, and JavaScript in one file
data.json     ← Country data (250 countries)

⚠️  Both files must be in the same folder for the app to work.

Getting Started
Because the app loads data.json via fetch(), you cannot simply double-click index.html to open it. Browsers block local file requests for security reasons. You need to serve the files through a local development server.
Option 1 — VS Code Live Server (Recommended)
This is the easiest method and requires no command line.
1.  Install the Live Server extension in VS Code (by Ritwick Dey)
2.  Open the project folder in VS Code
3.  Right-click index.html → Open with Live Server
4.  The app opens automatically at http://127.0.0.1:5500
Option 2 — Python (if installed)
Open a terminal in the project folder and run:
py -m http.server 8000
Then visit http://localhost:8000 in your browser.
Option 3 — Node.js
If you have Node.js installed:
npx serve .
Then visit the URL shown in the terminal.

How It Works
Data Loading
On page load, the app fetches data.json using the browser's Fetch API. The 250 country objects are sorted alphabetically and stored in memory. All filtering and searching happens client-side with no additional network requests.
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    allCountries = data.sort((a, b) => a.name.localeCompare(b.name));
    filterCountries();
  });
Search & Filter
Both the search input and region dropdown call the same filterCountries() function on every change. It filters the in-memory array and re-renders the grid — no page reloads required.
Page Navigation
The app is a single-page application (SPA). There is no router — the home and detail views are just two divs that are shown or hidden using display: block / display: none. Clicking a country card calls showDetail() with the full country object passed directly as a JavaScript argument.
Dark Mode
Theme switching is handled entirely with CSS custom properties. Toggling the dark class on the body element switches every colour in the UI instantly, with smooth 0.2s transitions applied to background and text colours.

Built With
•HTML5
•CSS3 (Custom Properties, CSS Grid, Flexbox, Animations)
•Vanilla JavaScript (Fetch API, DOM manipulation)
•Nunito Sans — Google Fonts
•data.json from Frontend Mentor starter files

Acknowledgements
Challenge design and assets provided by Frontend Mentor (frontendmentor.io). Country data sourced from the REST Countries API, bundled locally as data.json.

Have fun building! 🚀
