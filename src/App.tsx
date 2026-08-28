import { ConnectWallet } from "./components/ConnectWallet";
import { NetworkGuard } from "./components/NetworkGuard";
import { SignInPanel } from "./components/SignInPanel";
import { IdentityCard } from "./components/IdentityCard";
import { BalancePanel } from "./components/BalancePanel";
import { useAddress, useEnsName } from "@thirdweb-dev/react";

export default function App() {
  const address = useAddress();
  const { data: ensName } = useEnsName({ address });

  // Grab the first 3-word part of the Basename (e.g., "happy.sunny.beach")
  const threeWordPin = ensName
    ? ensName.split('.')[0]?.replace(/-/g, ' ') || "your.pin.here"
    : "your.pin.here";

  const isConnected = !!address;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-md mx-auto px-5 py-8 flex flex-col gap-6">

        {/* Header – fixed: "B" for Base, not Bitcoin */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#0052FF] flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="text-lg font-semibold tracking-tight">Base</span>
          </div>
          {isConnected && (
            <span className="text-sm text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full">
              👋 {threeWordPin}
            </span>
          )}
        </header>

        {/* Hero – friendly copy */}
        <section className="text-center space-y-3 py-4">
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            {isConnected ? (
              <>
                Your <span className="text-[#0052FF]">3‑word</span> key
              </>
            ) : (
              <>
                Money, <span className="text-[#0052FF]">simplified.</span>
              </>
            )}
          </h1>
          <p className="text-zinc-400 text-sm max-w-xs mx-auto">
            {isConnected
              ? `You’re in as “${threeWordPin}” – your universal ID for real‑world assets.`
              : "Connect your wallet in seconds – no blockchain jargon, just three words."}
          </p>
          <div className="pt-2">
            <ConnectWallet />
          </div>
        </section>

        <NetworkGuard />

        {isConnected && (
          <>
            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-800">
              <IdentityCard />
              <div className="mt-3 text-center">
                <p className="text-2xl font-mono font-bold text-[#0052FF] tracking-wide">
                  {threeWordPin}
                </p>
                <p className="text-xs text-zinc-500 mt-1">Your permanent access key</p>
              </div>
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-800">
              <BalancePanel />
            </div>

            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-6 border border-zinc-800">
              <SignInPanel />
            </div>
          </>
        )}

        <footer className="text-center text-xs text-zinc-600 border-t border-zinc-800 pt-6 mt-2">
          <p>🔐 Your keys, your assets. No hidden fees.</p>
          <p className="mt-1">Built on Base – the home of real‑world assets.</p>
        </footer>
      </div>
    </div>
  );
}