# Price Comparison - Find Lower Prices Instantly

Save Time and Money — Instantly Compare Prices and Find Better Deals from Other Sites as you Browse!

<img width="1461" alt="Screenshot 2025-05-26 at 01 05 23" src="https://github.com/user-attachments/assets/148350d0-ae16-4ae0-b4a8-7b9feb6f67ba" />

## Features

- **Hot Module Replacement (HMR)** in development mode with Vite
- **Shadow DOM** encapsulation to avoid CSS conflicts with host websites

## Setup

### Prerequisites

- Node.js (version 18 or higher)
- Chrome browser

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd pricecomparison-extension
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file at the root of the project and add the following environment variables:
   ```env
   VITE_API_URL=
   VITE_LOCALE_URL=
   VITE_ICON_URL=
   ```

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Load the `dev/` folder as an unpacked extension in Chrome

3. Visit any website - the extension popup will be injected automatically

4. Make changes to and see them update in real-time thanks to Vite HMR!

### Production

1. Make sure your `.env` file contains the correct production API endpoint

2. Create the production bundle:
   ```bash
   npm run build
   ```

   Load the `package/` folder as an unpacked extension in Chrome

3. Or create a production bundle and zip it for distribution:
   ```bash
   npm run package
   ```
   
   This will create a `package.zip` file ready for Chrome Web Store submission.

## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`

2. Toggle **"Developer mode"** to ON in the top-right corner

3. Click **"Load unpacked"**

4. Select the folder where you have your extension bundle. In this case `dev/` for development and `package/` for production
