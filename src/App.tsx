import { ConnectWallet } from "./components/ConnectWallet";
import { NetworkGuard } from "./components/NetworkGuard";
import { SignInPanel } from "./components/SignInPanel";
import { IdentityCard } from "./components/IdentityCard";
import { BalancePanel } from "./components/BalancePanel";
import { useAccount, useEnsName } from "wagmi";

export default function App() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  const threeWordPin = ensName
    ? ensName.split(".").slice(0, 3).join(".")
    : "happy.sunny.beach";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-8">

        {/* Navigation */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-bold">
              3
            </div>

            <span className="text-lg font-semibold tracking-tight">
              3 WORD PIN
            </span>
          </div>

          {isConnected && (
            <span className="text-sm text-zinc-400">
              {threeWordPin}
            </span>
          )}
        </header>

        {/* Hero */}
        <section className="flex flex-1 flex-col items-center justify-center text-center">

          <p className="mb-5 text-sm text-zinc-500">
            YOUR PLACE. YOUR IDENTITY.
          </p>

          <h1 className="text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl">
            Give every place
            <br />
            <span className="text-[#00e013]">
              three words.
            </span>
          </h1>

          <p className="mt-6 max-w-sm text-base leading-relaxed text-zinc-400">
            A simple way to identify, find and interact
            with real-world places.
          </p>

          <div className="mt-10">
            <ConnectWallet />
          </div>

        </section>

        {/* Connected experience */}
        {isConnected && (
          <section className="space-y-10 pb-10">

            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">
                Your 3 WORD PIN
              </p>

              <h2 className="text-3xl font-medium tracking-tight">
                {threeWordPin}
              </h2>
            </div>

            <IdentityCard />

            <BalancePanel />

            <SignInPanel />

          </section>
        )}

        <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">
          One place. Three words.
        </footer>

        <NetworkGuard />

      </div>
    </main>
  );
}
