// Mariano Montini ('bosque', 'bosquestudio')
import { Link } from "react-router-dom";
import { NetworkGuard } from "../components/NetworkGuard";
import { IdentityCard } from "../components/IdentityCard";
import { BalancePanel } from "../components/BalancePanel";

// Landing page – Airbnb of 3 Word Pins
export function HomePage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
      {/* Hero Section */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          🏦 The Airbnb of{" "}
          <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
            3 Word Pins
          </span>
        </h1>
        <p className="text-lg text-zinc-400">
          Buy, sell, rent, and verify tokenized 3 Word Pin addresses.
          Each pin is a unique digital asset representing real 16×16 ft land.
        </p>
        
        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            to="/buy"
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            🛒 Browse Pins
          </Link>
          <a
            href="https://3wordpin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
          >
            👀 Find Your 3 Word Pin
          </a>
          <a
            href="https://social.3wordpin.com/product/3-word-pin-address/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25"
           >
            📍 Claim Your 3 Word Pin
          </a>
        </div>
        
        {/* Subtle trust line */}
        <p className="text-xs text-zinc-500 pt-2">
          Own a unique 16×16 ft digital land asset on the grid
        </p>
      </header>

      <NetworkGuard />
      <IdentityCard />
      <BalancePanel />

      {/* How It Works */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-sky-400">
          🔑 How It Works
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <p>
            <strong>1. Browse 3 Word Pins.</strong>{" "}
            Explore tokenized locations like <code>///table.lamp.spoon</code>.
          </p>
          <p>
            <strong>2. Buy or Rent.</strong>{" "}
            Purchase the digital asset to own the pin, or rent it temporarily.
          </p>
          <p>
            <strong>3. Verify Ownership.</strong>{" "}
            Your wallet proves you own the pin — on-chain and unforgeable.
          </p>
          <p>
            <strong>4. Earn $LUV.</strong>{" "}
            Holders earn rewards and unlock exclusive benefits.
          </p>
        </div>
        
        {/* Inline CTA after steps */}
        <div className="pt-2">
          <a
            href="https://3wordpin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-6 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
          >
            🎯 Get Your Own Pin Now
          </a>
        </div>
      </section>

      {/* Real-World Uses */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-sky-400">
          🌍 Use It In Real Life
        </h2>
        <div className="space-y-3 text-sm text-zinc-300">
          <p>
            <strong>🏠 Rent out your pin space.</strong>{" "}
            Own a 3 Word Pin? Rent the physical 16×16 ft spot tied to it.
          </p>
          <p>
            <strong>🛒 Pay for local goods.</strong>{" "}
            Use $LUV points at participating shops near your pin.
          </p>
          <p>
            <strong>💳 Build reputation.</strong>{" "}
            Your wallet shows activity without needing a credit score.
          </p>
          <p>
            <strong>📈 Skip the banks.</strong>{" "}
            Move value quickly and simply — especially for short-term rentals.
          </p>
        </div>
      </section>

      {/* $LUV Reward */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-sky-400">
          🎁 Earn 1,000 $LUV Points Now
        </h2>
        <ol className="list-decimal list-inside text-sm text-zinc-300 space-y-1">
          <li>
            Follow{" "}
            <a
              href="https://tiktok.com/@3wordpin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-sky-400 hover:text-sky-300"
            >
              @3wordpin on TikTok
            </a>
          </li>
          <li>Post saying you're claiming love for a 3 Word Pin.</li>
          <li>
            Get <strong>1,000 $LUV points</strong> added to your wallet.
          </li>
        </ol>
        <p className="text-xs text-zinc-500">
          Powered by <strong>$LUV</strong> – the 3 Word Pin reward points.
        </p>
      </section>

      {/* Final CTA Section */}
      <section className="rounded-xl border border-zinc-800 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold text-white">
          Ready to claim your place on the grid?
        </h2>
        <p className="text-sm text-zinc-300">
          Join the tribe of digital landowners. Your 3 Word Pin is waiting.
        </p>
        <a
          href="https://3wordpin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 rounded-full font-bold text-white hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30"
        >
          📍 Claim Your 3 Word Pin →
        </a>
        <p className="text-xs text-zinc-500">
          ///KEEP.IT.SIMPLE
        </p>
      </section>
    </div>
  );
}