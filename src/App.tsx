// Mariano Montini ('bosque', 'bosquestudio')
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ConnectWallet } from "./components/ConnectWallet";
import { HomePage } from "./pages/HomePage";
import { BuyPage } from "./pages/BuyPage";
import { SellPage } from "./pages/SellPage";
import { ProfilePage } from "./pages/ProfilePage";

// App shell – 3 Word Pin Wallet: The Airbnb of Digital Land
export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* Navigation Bar */}
        <nav className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50">
          <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl">🏦</span>
              <span className="font-bold text-lg">3 Word Pin Wallet</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/buy" className="text-sm text-zinc-300 hover:text-white transition-colors">
                🛒 Buy Pins
              </Link>
              <Link to="/sell" className="text-sm text-zinc-300 hover:text-white transition-colors">
                💰 Sell Pins
              </Link>
              <Link to="/profile" className="text-sm text-zinc-300 hover:text-white transition-colors">
                👤 My Pins
              </Link>
              <ConnectWallet />
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}