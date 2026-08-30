// Mariano Montini ('bosque', 'bosquestudio')
import { ConnectWallet } from "./components/ConnectWallet";
import { NetworkGuard } from "./components/NetworkGuard";
import { SignInPanel } from "./components/SignInPanel";
import { IdentityCard } from "./components/IdentityCard";
import { BalancePanel } from "./components/BalancePanel";

// App shell – simple landing page for 3 Word Pin Wallet
export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex max-w-xl flex-col gap-8 px-6 py-12">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
            3 Word Pin Wallet
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Your friendly wallet for the 3 Word Pin world
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Connect, see your identity, check your points, and earn rewards –
            no technical knowledge needed.
          </p>
          <div className="pt-2">
            <ConnectWallet />
          </div>
        </header>

        <NetworkGuard />
        <IdentityCard />
        <BalancePanel />
        <SignInPanel />

        {/* $LUV Reward Section */}
        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            🎁 Earn 1,000 $LUV points now!
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
            <li>
              Post a short message saying you're claiming love for a 3 Word
              Pin.
            </li>
            <li>
              Get <strong>1,000 $LUV points</strong> added to your wallet.
            </li>
          </ol>
          <p className="text-xs text-zinc-500">
            Powered by <strong>$LUV</strong> – the 3 Word Pin reward points.
          </p>
        </section>

        <footer className="border-t border-zinc-800 pt-6 text-xs text-zinc-600">
          No passwords to remember. No confusing jargon. Just connect and
          start earning.
        </footer>
      </div>
    </div>
  );
}
