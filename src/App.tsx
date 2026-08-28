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
        {/* Header */}
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
            <span className="text-sm text-white">
              {threeWordPin}
            </span>
          )}
        </header>
        {/* Landing Page */}
        {!isConnected && (
          <section className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-white">
              YOUR PLACE. YOUR IDENTITY.
            </p>
            <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Give every place
              <br />
              <span className="text-[#00E013]">
                three words.
              </span>
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white">
              A simple way to identify, find, share and
              interact with real-world places.
            </p>
            <div className="mt-10">
              <ConnectWallet />
            </div>
            <p className="mt-5 text-xs text-white">
              No crypto knowledge required.
            </p>
          </section>
        )}
        {/* Connected Experience */}
        {isConnected && (
          <section className="flex-1 space-y-10 py-12">
            <div className="text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-white">
                YOUR 3 WORD PIN
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                {threeWordPin}
              </h1>
              <p className="mt-3 text-sm text-white">
                Your universal identity for a real-world place.
              </p>
            </div>
            <IdentityCard />
            <BalancePanel />
            <SignInPanel />
          </section>
        )}
        {/* NetworkGuard is functional infrastructure,
            but remains invisible to the landing-page design. */}
        <NetworkGuard />
        {/* Footer */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs text-white">
          <p>One place. Three words.</p>
        </footer>
      </div>
    </main>
  );
}
