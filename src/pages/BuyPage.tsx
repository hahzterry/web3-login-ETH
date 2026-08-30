// Mariano Montini ('bosque', 'bosquestudio')
import { useReadContract } from "thirdweb/react";
import { getContract, type NFT } from "thirdweb";
import { getNFTs } from "thirdweb/extensions/erc721";
import { client, baseMainnet } from "../lib/chains";

// Replace with your collection address
const COLLECTION_ADDRESS = "0x36b576a0f90d1Ed7c46E124BFe4d2Dc1ee0242cA";

export function BuyPage() {
  const contract = getContract({
    client,
    chain: baseMainnet,
    address: COLLECTION_ADDRESS,
  });

  const { data, isLoading } = useReadContract(getNFTs, {
    contract,
    start: 0,
    count: 100,
  });

  const assets = (data as NFT[]) || [];

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
      <header>
        <h1 className="text-3xl font-bold">🛒 Browse 3 Word Pins</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Find your perfect digital land. Each pin is a unique digital asset.
        </p>
      </header>

      {isLoading ? (
        <p className="text-zinc-400">Loading available pins…</p>
      ) : assets.length === 0 ? (
        <p className="text-zinc-400">
          No pins available yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id.toString()}
              className="border border-zinc-700 rounded-lg overflow-hidden bg-zinc-800/50 hover:border-sky-400 transition-colors"
            >
              {asset.metadata.image && (
                <img
                  src={asset.metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  alt={asset.metadata.name || `Pin #${asset.id.toString()}`}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-white">
                  {asset.metadata.name || `3 Word Pin #${asset.id.toString()}`}
                </h3>
                {asset.metadata.description && (
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                    {asset.metadata.description}
                  </p>
                )}
                <button
                  className="mt-3 w-full py-2 bg-gradient-to-r from-sky-500 to-purple-500 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                  onClick={() => alert(`View pin: ${asset.metadata.name}`)}
                >
                  View Pin
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}