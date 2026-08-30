// Mariano Montini ('bosque', 'bosquestudio')
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract, type NFT } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { client, baseMainnet } from "../lib/chains";

// Replace with your collection address
const COLLECTION_ADDRESS = "0x36b576a0f90d1Ed7c46E124BFe4d2Dc1ee0242cA";

export function SellPage() {
  const account = useActiveAccount();
  const contract = getContract({
    client,
    chain: baseMainnet,
    address: COLLECTION_ADDRESS,
  });

  const { data, isLoading } = useReadContract(getOwnedNFTs, {
    contract,
    owner: account?.address || "",
    queryOptions: {
      enabled: !!account?.address,
    },
  });

  const assets = (data as NFT[]) || [];

  if (!account) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
        <h1 className="text-3xl font-bold">💰 Sell Your Pins</h1>
        <p className="text-zinc-400">Connect your wallet to list your pins for sale.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12">
      <header>
        <h1 className="text-3xl font-bold">💰 Sell Your 3 Word Pins</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Select a 3 Word Pin to list it for sale or rent.
        </p>
      </header>

      {isLoading ? (
        <p className="text-zinc-400">Loading your pins…</p>
      ) : assets.length === 0 ? (
        <p className="text-zinc-400">
          You don't own any pins yet. Buy one first!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id.toString()}
              className="border border-zinc-700 rounded-lg overflow-hidden bg-zinc-800/50 hover:border-purple-400 transition-colors"
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
                <button
                  className="mt-3 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                  onClick={() => alert(`List pin for sale: ${asset.metadata.name}`)}
                >
                  List for Sale
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
