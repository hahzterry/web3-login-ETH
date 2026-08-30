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
const COLLECTION_ADDRESS =
  "0x36b576a0f90d1Ed7c46E124BFe4d2Dc1ee0242cA";
function ipfsToHttp(uri?: string) {
  if (!uri) return "";
  if (uri.startsWith("ipfs://")) {
    return uri.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
  }
  return uri;
}
function getPinMetadata(asset: NFT) {
  const metadata = asset.metadata as Record<string, any>;
  const tokenId = asset.id.toString();
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
      metadata.image as string | undefined
    ),
    pinUrl:
      metadata.pin_url ||
      metadata.pinUrl ||
      "",
  };
}
export function SellPage() {
  const account = useActiveAccount();
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
    owner: account?.address || "",
    queryOptions: {
      enabled: !!account?.address,
    },
  });
  const assets = (data as NFT[]) || [];
  /*
   * Wallet not connected
   */
  if (!account) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 text-3xl">
            💰
          </div>
          <h1 className="text-3xl font-bold text-white">
            Sell Your 3 Word Pins
          </h1>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            Connect your wallet to see the 3 Word Pins you own
            and list them for sale.
          </p>
        </div>
      </div>
    );
  }
  /*
   * Main page
   */
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Sell Your 3 Word Pins
            </h1>
            <p className="mt-2 text-sm text-zinc-400">
              List a location you own for sale or future rental.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500">
              Connected Wallet
            </p>
            <p className="mt-1 font-mono text-xs text-zinc-300">
              {account.address.slice(0, 6)}...
              {account.address.slice(-4)}
            </p>
          </div>
        </div>
      </header>
      {/* Loading */}
      {isLoading && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <p className="text-zinc-400">
            Loading your 3 Word Pins...
          </p>
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
          <p className="font-semibold">
            Unable to load your 3 Word Pins.
          </p>
          <p className="mt-1 text-xs">
            {error.message || "Unknown error"}
          </p>
        </div>
      )}
      {/* No NFTs */}
      {!isLoading &&
        !error &&
        assets.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
            <div className="text-4xl">
              📍
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">
              You don't own any 3 Word Pins yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Purchase a 3 Word Pin first and it will appear
              here when the 3 Word Pin is owned by your wallet.
            </p>
            <a
              href="/buy"
              className="mt-6 inline-block rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Browse 3 Word Pins
            </a>
          </div>
        )}
      {/* NFT Grid */}
      {!isLoading &&
        !error &&
        assets.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => {
              const pin = getPinMetadata(asset);
              return (
                <div
                  key={pin.tokenId}
                  className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:-translate-y-1 hover:border-purple-400/50"
                >
                  {/* Image */}
                  {pin.image ? (
                    <img
                      src={pin.image}
                      alt={pin.name}
                      className="h-52 w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-zinc-800">
                      <span className="text-sm font-semibold tracking-widest text-zinc-500">
                        3 WORD PIN
                      </span>
                    </div>
                  )}
                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-semibold text-white">
                          {pin.name}
                        </h2>
                        <p className="mt-1 text-xs text-zinc-500">
                          Token #{pin.tokenId}
                        </p>
                      </div>
                      <span className="rounded-full bg-purple-500/10 px-2 py-1 text-xs text-purple-400">
                        Owned
                      </span>
                    </div>
                    {/* 3 Word Address */}
                    {pin.address && (
                      <div className="mt-4 rounded-lg bg-zinc-800/70 p-3">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                          3 Word Pin Address
                        </p>
                        <p className="mt-1 font-mono text-sm font-semibold text-purple-400">
                          {pin.address}
                        </p>
                      </div>
                    )}
                    {/* Description */}
                    {pin.description && (
                      <p className="mt-3 line-clamp-2 text-sm text-zinc-400">
                        {pin.description}
                      </p>
                    )}
                    {/* Actions */}
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <a
                        href={`/pin/${pin.tokenId}`}
                        className="rounded-lg border border-zinc-700 px-3 py-3 text-center text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white"
                      >
                        View Pin
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          window.dispatchEvent(
                            new CustomEvent(
                              "open-sell-pin",
                              {
                                detail: {
                                  tokenId: pin.tokenId,
                                  name: pin.name,
                                  address: pin.address,
                                },
                              }
                            )
                          );
                        }}
                        className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      >
                        List for Sale
                      </button>
                    </div>
                    {/* Explorer */}
                    <a
                      href={`https://basescan.org/token/${COLLECTION_ADDRESS}?a=${pin.tokenId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 block text-center text-xs text-zinc-500 hover:text-zinc-300"
                    >
                      View 3 Word Pin on BaseScan →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
    </div>
  );
}
