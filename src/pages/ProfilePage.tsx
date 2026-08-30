import { useState } from "react";
import {
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import {
  getContract,
  type NFT,
} from "thirdweb";
import {
  getOwnedNFTs,
} from "thirdweb/extensions/erc721";
import { client, baseMainnet } from "../lib/chains";
// Same 3 Word Pin NFT contract used by BuyPage and SellPage
const COLLECTION_ADDRESS =
  "0x36b576a0f90d1Ed7c46E124BFe4d2Dc1ee0242cA";
function ipfsToHttp(uri?: string) {
  if (!uri) return "";
  if (uri.startsWith("ipfs://")) {
    return uri.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/",
    );
  }
  return uri;
}
function getPinMetadata(nft: NFT) {
  const metadata = nft.metadata as Record<string, any>;
  const tokenId = nft.id.toString();
  return {
    tokenId,
    name:
      metadata.name ||
      `3 Word Pin #${tokenId}`,
    address:
      metadata.three_word_address ||
      metadata.threeWordAddress ||
      metadata.address ||
      "",
    description:
      metadata.description ||
      "Unique 3 Word Pin location.",
    image: ipfsToHttp(
      metadata.image as string | undefined,
    ),
    pinUrl:
      metadata.pin_url ||
      metadata.pinUrl ||
      `/pin/${tokenId}`,
  };
}
function ProfileContent({
  address,
}: {
  address: string;
}) {
  const [tab, setTab] = useState<
    "nfts" | "activity"
  >("nfts");
  const contract = getContract({
    client,
    chain: baseMainnet,
    address: COLLECTION_ADDRESS,
  });
  const {
    data,
    isLoading,
    error,
  } = useReadContract(getOwnedNFTs, {
    contract,
    owner: address,
  });
  const nfts = (data as NFT[]) || [];
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Profile Header */}
      <section className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-purple-500 text-2xl font-bold text-white">
            {address
              .slice(2, 4)
              .toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              🏦 My 3 Word Pin Profile
            </h1>
            <p className="mt-2 font-mono text-sm text-zinc-400">
              {address.slice(0, 8)}
              ...
              {address.slice(-6)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Base Mainnet
            </p>
          </div>
        </div>
      </section>
      {/* Tabs */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900">
        <div className="flex border-b border-zinc-800 px-6">
          <button
            type="button"
            onClick={() => setTab("nfts")}
            className={`mr-6 py-4 text-sm font-semibold transition-colors ${
              tab === "nfts"
                ? "border-b-2 border-sky-400 text-sky-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            📍 My Pins ({nfts.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("activity")}
            className={`py-4 text-sm font-semibold transition-colors ${
              tab === "activity"
                ? "border-b-2 border-sky-400 text-sky-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            📊 Activity
          </button>
        </div>
        <div className="p-6">
          {/* NFTs */}
          {tab === "nfts" && (
            <>
              {isLoading && (
                <div className="py-12 text-center">
                  <p className="text-zinc-400">
                    Loading your 3 Word Pins...
                  </p>
                </div>
              )}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
                  <p className="font-semibold">
                    Unable to load your pins.
                  </p>
                  <p className="mt-1 text-xs">
                    {error.message ||
                      "Unknown error"}
                  </p>
                </div>
              )}
              {!isLoading &&
                !error &&
                nfts.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="text-5xl">
                      📍
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-white">
                      No 3 Word Pins Yet
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
                      You don't own any 3 Word Pins yet.
                      Browse the marketplace to get started.
                    </p>
                    <a
                      href="/buy"
                      className="mt-6 inline-block rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      Browse Pins
                    </a>
                  </div>
                )}
              {!isLoading &&
                !error &&
                nfts.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {nfts.map((nft) => {
                      const pin =
                        getPinMetadata(nft);
                      return (
                        <div
                          key={pin.tokenId}
                          className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-all hover:border-sky-400/50"
                        >
                          {/* Image */}
                          {pin.image ? (
                            <img
                              src={pin.image}
                              alt={pin.name}
                              className="h-48 w-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <div className="flex h-48 items-center justify-center bg-zinc-800">
                              <span className="text-sm font-semibold tracking-widest text-zinc-500">
                                3 WORD PIN
                              </span>
                            </div>
                          )}
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <h3 className="font-semibold text-white">
                                  {pin.name}
                                </h3>
                                <p className="mt-1 text-xs text-zinc-500">
                                  Token #{pin.tokenId}
                                </p>
                              </div>
                              <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">
                                Owned
                              </span>
                            </div>
                            {/* 3 Word Address */}
                            {pin.address && (
                              <div className="mt-4 rounded-lg bg-zinc-800/70 p-3">
                                <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                                  3 Word Address
                                </p>
                                <p className="mt-1 font-mono text-sm font-semibold text-sky-400">
                                  {pin.address}
                                </p>
                              </div>
                            )}
                            {pin.description && (
                              <p className="mt-3 line-clamp-2 text-sm text-zinc-400">
                                {pin.description}
                              </p>
                            )}
                            {/* Actions */}
                            <div className="mt-5 grid grid-cols-2 gap-2">
                              <a
                                href={pin.pinUrl}
                                className="rounded-lg border border-zinc-700 px-3 py-2.5 text-center text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white"
                              >
                                View Pin
                              </a>
                              <a
                                href={`/sell?tokenId=${pin.tokenId}`}
                                className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90"
                              >
                                Sell
                              </a>
                            </div>
                            {/* BaseScan */}
                            <a
                              href={`https://basescan.org/token/${COLLECTION_ADDRESS}?a=${pin.tokenId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 block text-center text-xs text-zinc-500 hover:text-zinc-300"
                            >
                              View on BaseScan →
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
            </>
          )}
          {/* Activity */}
          {tab === "activity" && (
            <div className="py-10 text-center">
              <div className="text-4xl">
                📊
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">
                Activity
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
                Your purchases, sales, transfers, and
                rental history can appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
/**
 * ProfilePage
 *
 * This is the named export used by App.tsx:
 *
 * import { ProfilePage } from "./pages/ProfilePage";
 */
export function ProfilePage() {
  const account = useActiveAccount();
  if (!account) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-500/10 text-3xl">
            👤
          </div>
          <h1 className="mt-5 text-2xl font-bold text-white">
            Connect Your Wallet
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
            Connect your wallet to view your 3 Word Pins,
            ownership, and activity.
          </p>
        </div>
      </div>
    );
  }
  return (
    <ProfileContent
      address={account.address}
    />
  );
}
export default ProfilePage;