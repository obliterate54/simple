# Simple Memecoin Website

A modern, responsive website for the Simple memecoin project built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, clean design with gradient backgrounds
- 📱 Fully responsive (mobile and desktop)
- 📊 Live market data section
- 🔗 Social media integration
- 🚀 Smooth animations and hover effects
- 💰 Trading and chart links integration
- 📋 Contract address copy functionality

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Customization

### Update Contract Address
Replace `YOUR_CONTRACT_ADDRESS_HERE` in `src/App.tsx` with your actual Solana contract address.

### Update Social Links
Update the social media links in the header and footer:
- Twitter: Replace `https://twitter.com/SimpleCoinSOL`
- Telegram: Replace `https://t.me/SimpleCoinOfficial`

### Update Trading Links
Update the trading and chart links in the hero section:
- Buy button: Replace `https://jup.ag/swap/SOL-SIMPLE`
- Chart button: Replace `https://dexscreener.com/solana/simple`

### Market Data
The market data is currently using mock data. To integrate real data:
1. Connect to a price API (CoinGecko, Jupiter, etc.)
2. Update the `marketData` state in `src/App.tsx`
3. Add a data fetching mechanism

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)

## License

This project is open source and available under the MIT License.