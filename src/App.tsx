import React, { useState, useEffect } from 'react';
import { Menu, X, Twitter, MessageCircle, Copy, TrendingUp, Users, Zap, Target, ChevronDown, ExternalLink } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock market data - replace with real API calls
  const [marketData, setMarketData] = useState({
    price: 0.000660,
    change24h: 32.2,
    marketCap: 650000,
    volume24h: 301000,
    rank: 4198,
    holders: 1247
  });

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
  const fetchMarketData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=simple-coin'
      );
      const data = await response.json();
      const coin = data[0];

      setMarketData(prev => ({
        ...prev,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume,
        rank: coin.market_cap_rank,
        // holders remains unchanged
      }));

      setDataLoaded(true); // <- ✅ add this to indicate data is ready
    } catch (error) {
      console.error("Error fetching live data:", error);
    }
  };

  fetchMarketData(); // initial fetch

  const interval = setInterval(fetchMarketData, 1000); // fetch every 60 seconds
  return () => clearInterval(interval); // cleanup on unmount
}, []);



  const contractAddress = "Chsqyzk3S4uaFdajsQNMp2FnJ4rQMzTd3ykvwyycbonk";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen light-bg">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 orange-bg rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">$</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">SIMPLE</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="nav-link font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="nav-link font-medium">About</button>
              <button onClick={() => scrollToSection('tokenomics')} className="nav-link font-medium">Tokenomics</button>
              <button onClick={() => scrollToSection('roadmap')} className="nav-link font-medium">Roadmap</button>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <a href="https://twitter.com/asimplecoinsol" target="_blank" rel="noopener noreferrer" className="nav-link">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="nav-link">
                <MessageCircle className="w-6 h-6" />
              </a>
              <button 
                onClick={() => window.open('https://dexscreener.com/solana/Br5pwV1ggQd2zUYmMEmBvnrspvkBnosTEdqF1CkHMSmp', '_blank')}
                className="orange-bg text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity"
              >
                Buy Now
              </button>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="nav-link text-left font-medium">Home</button>
                <button onClick={() => scrollToSection('about')} className="nav-link text-left font-medium">About</button>
                <button onClick={() => scrollToSection('tokenomics')} className="nav-link text-left font-medium">Tokenomics</button>
                <button onClick={() => scrollToSection('roadmap')} className="nav-link text-left font-medium">Roadmap</button>
                <div className="flex space-x-4 pt-4">
                  <a href="https://twitter.com/SimpleCoinSOL" target="_blank" rel="noopener noreferrer" className="nav-link">
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a href="https://t.me/SimpleCoinOfficial" target="_blank" rel="noopener noreferrer" className="nav-link">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="light-bg py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800">
              Welcome to <span className="orange-text">Simple</span> Coin
            </h1>
            
            <div className="mb-8 animate-float">
              <div className="w-32 h-32 mx-auto orange-gradient rounded-full flex items-center justify-center mb-6 shadow-lg">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <span className="text-4xl">🪙</span>
                </div>
              </div>
            </div>

            <div className="orange-gradient text-white p-8 rounded-3xl mb-8 max-w-2xl mx-auto shadow-lg">
              <p className="text-xl font-semibold mb-2">A coin that provides nothing but simplicity and memes.</p>
              <p className="text-lg mb-2">Zero Confusion, Zero Complexity, Zero Effort.</p>
              <p className="text-lg font-bold">Purely 100% Simple.</p>
              <p className="text-lg font-bold mt-2">Make Memes Simple Again.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => window.open('https://dexscreener.com/solana/Br5pwV1ggQd2zUYmMEmBvnrspvkBnosTEdqF1CkHMSmp', '_blank')}
                className="orange-bg text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg hover-scale"
              >
                Buy $SIMPLE
              </button>
              <button 
                onClick={() => window.open('https://dexscreener.com/solana/Br5pwV1ggQd2zUYmMEmBvnrspvkBnosTEdqF1CkHMSmp', '_blank')}
                className="bg-white text-gray-700 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-orange-300 transition-colors hover-scale"
              >
                View Chart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Data Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="orange-text">Simple</span> Market Data
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="market-card rounded-3xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 orange-bg rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">$</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">Simple coin</h3>
                    <p className="text-gray-500">SIMPLE/USD</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 font-medium">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 cream-bg rounded-2xl">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-orange-500 text-lg">💰</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Price</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {dataLoaded ? marketData.price.toFixed(6) : 'Loading...'} </p>
                  <p className="text-sm font-semibold price-positive">
                    ↗ {marketData.change24h}%
                  </p>
                </div>

                <div className="text-center p-4 cream-bg rounded-2xl">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-blue-500 text-lg">📊</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Market Cap</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {dataLoaded ? formatNumber(marketData.marketCap) : 'Loading...'} </p>
                  <p className="text-sm text-gray-500">
                    {dataLoaded ? "Rank #{marketData.rank}" : 'Loading...'} </p>
                </div>

                <div className="text-center p-4 cream-bg rounded-2xl">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-purple-500 text-lg">👥</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">24h Volume</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {dataLoaded ? formatNumber(marketData.volume24h) : 'Loading...'} </p>
                </div>

                <div className="text-center p-4 cream-bg rounded-2xl">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-green-500 text-lg">⚡</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Blockchain</p>
                  <p className="text-2xl font-bold text-gray-800">Solana</p>
                  <p className="text-sm text-gray-500">Fast & Cheap</p>
                </div>
              </div>

              <div className="mt-6 p-4 cream-bg rounded-2xl">
                <p className="text-sm text-gray-600 mb-2">Contract Address:</p>
                <button 
                  onClick={() => copyToClipboard(contractAddress)}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-orange-600 transition-colors font-mono"
                >
                  <span className="break-all">{contractAddress}</span>
                  <Copy className="w-4 h-4 flex-shrink-0" />
                </button>
                {copied && <p className="text-green-600 text-sm mt-1">Copied to clipboard!</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 cream-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why <span className="orange-text">Simple</span>?</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              In a world of complex DeFi protocols and confusing tokenomics, Simple stands out by 
              doing exactly what its name suggests.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="feature-card p-8 rounded-3xl hover-scale">
                <div className="w-16 h-16 orange-bg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Zero Complexity</h3>
                <p className="text-gray-600">No complicated staking mechanisms, no confusing yield farming, no complex tokenomics. Just pure, simple memecoin fun.</p>
              </div>

              <div className="feature-card p-8 rounded-3xl hover-scale">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Community Driven</h3>
                <p className="text-gray-600">Built by the community, for the community. Simple thrives on memes, jokes, and the collective power of simplicity.</p>
              </div>

              <div className="feature-card p-8 rounded-3xl hover-scale">
                <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Solana Speed</h3>
                <p className="text-gray-600">Built on Solana for lightning-fast transactions and minimal fees. Because simplicity shouldn't be expensive.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Simple <span className="orange-text">Tokenomics</span></h2>
            
            <div className="orange-gradient p-8 rounded-3xl text-white mb-8 shadow-lg">
              <h3 className="text-3xl font-bold mb-4">1,000,000,000 Total Supply</h3>
              <p className="text-lg">Because round numbers are simple numbers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="cream-bg p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Distribution</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Liquidity Pool</span>
                    <span className="font-bold text-gray-800">90%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Marketing</span>
                    <span className="font-bold text-gray-800">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Team</span>
                    <span className="font-bold text-gray-800">5%</span>
                  </div>
                </div>
              </div>

              <div className="cream-bg p-8 rounded-3xl">
                <h4 className="text-xl font-bold text-gray-800 mb-6">Features</h4>
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">No Tax</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Liquidity Locked</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Contract Renounced</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">100% Community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 cream-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Simple <span className="orange-text">Roadmap</span></h2>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Phase 1: Launch</h3>
                <p className="text-gray-600">Launch $SIMPLE on Solana. Create website. Build community.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 orange-bg rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Phase 2: Growth</h3>
                <p className="text-gray-600">Get listed on major DEXs. Grow community to 10K holders.</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-bold">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Phase 3: Memes</h3>
                <p className="text-gray-600">Create the best memes. Become the simplest coin on Solana.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="orange-gradient text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="orange-text font-bold text-2xl">$</span>
              </div>
              <span className="text-3xl font-bold">$SIMPLE</span>
            </div>
            
            <p className="text-lg mb-6">Making memes simple again, one token at a time.</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="https://x.com/asimplecoinsol" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-200 transition-colors">
                <Twitter className="w-8 h-8" />
              </a>
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-200 transition-colors">
                <MessageCircle className="w-8 h-8" />
              </a>
            </div>
            
            <div className="border-t border-white/20 pt-6">
              <p className="text-sm opacity-80">© 2024 Simple Coin. All rights reserved. Built on Solana.</p>
              <p className="text-xs opacity-60 mt-2">This is a meme coin with no intrinsic value or expectation of financial return.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;