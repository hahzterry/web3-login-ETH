import { useReadContract } from "thirdweb/react";
import { getContract, type NFT } from "thirdweb";
import { getNFTs } from "thirdweb/extensions/erc721";
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
function getPinName(asset: NFT) {
  const metadata = asset.metadata as Record<string, any>;
  return (
    metadata.name ||
    metadata.three_word_address ||
    metadata.threeWordAddress ||
    `3 Word Pin #${asset.id.toString()}`
  );
}
function getPinAddress(asset: NFT) {
  const metadata = asset.metadata as Record<string, any>;
  return (
    metadata.three_word_address ||
    metadata.threeWordAddress ||
    metadata.address ||
    ""
  );
}
function getPinUrl(asset: NFT) {
  const metadata = asset.metadata as Record<string, any>;
  // If your NFT metadata eventually contains a pin URL,
  // use it automatically.
  if (metadata.pin_url) {
    return metadata.pin_url;
  }
  if (metadata.pinUrl) {
    return metadata.pinUrl;
  }
  // Otherwise create a URL based on the NFT token ID.
  return `/pin/${asset.id.toString()}`;
}
export function BuyPage() {
  const contract = getContract({
    client,
    chain: baseMainnet,
    address: COLLECTION_ADDRESS,
  });
  const { data, isLoading, error } = useReadContract(getNFTs, {
    contract,
    start: 0,
    count: 100,
  });
  const assets = (data as NFT[]) || [];
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          🛒 Browse 3 Word Pins
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Discover unique 3 Word Pins mapped to digital locations.
        </p>
      </header>
      {/* Loading */}
      {isLoading && (
        <div className="py-12 text-center text-zinc-400">
          Loading 3 Word Pins…
        </div>
      )}
      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          <p className="font-semibold">
            Unable to load the NFT collection.
          </p>
          <p className="mt-1">
            {error.message || "Unknown error"}
          </p>
        </div>
      )}
      {/* Empty */}
      {!isLoading && !error && assets.length === 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <h2 className="text-lg font-semibold text-white">
            No 3 Word Pins yet
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            No NFTs were found in this collection.
          </p>
        </div>
      )}
      {/* NFT Grid */}
      {!isLoading && !error && assets.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {assets.map((asset) => {
            const pinName = getPinName(asset);
            const pinAddress = getPinAddress(asset);
            const pinUrl = getPinUrl(asset);
            const image = ipfsToHttp(
              asset.metadata.image as string | undefined
            );
            return (
              <div
                key={asset.id.toString()}
                className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-xl"
              >
                {/* Image */}
                {image ? (
                  <img
                    src={image}
                    alt={pinName}
                    className="h-48 w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-zinc-800">
                    <span className="text-sm text-zinc-500">
                      3 WORD PIN
                    </span>
                  </div>
                )}
                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">
                        {pinName}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        Token #{asset.id.toString()}
                      </p>
                    </div>
                    <span className="rounded-full bg-sky-500/10 px-2 py-1 text-xs text-sky-400">
                      NFT
                    </span>
                  </div>
                  {/* 3 Word Address */}
                  {pinAddress && (
                    <div className="mt-4 rounded-lg bg-zinc-800/70 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                        3 Word Address
                      </p>
                      <p className="mt-1 font-mono text-sm font-semibold text-sky-400">
                        {pinAddress}
                      </p>
                    </div>
                  )}
                  {/* Description */}
                  {asset.metadata.description && (
                    <p className="mt-3 line-clamp-2 text-sm text-zinc-400">
                      {asset.metadata.description}
                    </p>
                  )}
                  {/* Actions */}
                  <div className="mt-5 flex gap-2">
                    <a
                      href={pinUrl}
                      className="flex-1 rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      View Pin
                    </a>
                    <a
                      href={`https://basescan.org/token/${COLLECTION_ADDRESS}?a=${asset.id.toString()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white"
                    >
                      NFT
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
