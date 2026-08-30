// Mariano Montini ('bosque', 'bosquestudio')
import { useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract, type NFT } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { client, baseMainnet } from "../lib/chains";

// Replace with your NFT collection address
const NFT_COLLECTION_ADDRESS = "0xYourNftContractAddress";

export function Profile() {
  const account = useActiveAccount();
  const [tab, setTab] = useState<"nfts" | "activity">("nfts");

  const nftCollection = getContract({
    client,
    chain: baseMainnet,
    address: NFT_COLLECTION_ADDRESS,
  });

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useReadContract(
    account
      ? getOwnedNFTs({
          contract: nftCollection,
          owner: account.address,
        })
      : null,
  );

  if (!account) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">
          🔗 Connect your wallet to view your profile.
        </p>
      </section>
    );
  }

  const nfts = (ownedNfts as NFT[]) || [];

  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
          {account.address.slice(2, 4).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">
            🏦 My Profile
          </h2>
          <p className="text-sm text-zinc-400">
            {account.address.slice(0, 6)}…{account.address.slice(-4)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-800">
        <button
          className={`pb-2 text-sm font-medium transition-colors ${
            tab === "nfts"
              ? "text-sky-400 border-b-2 border-sky-400"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          onClick={() => setTab("nfts")}
        >
          🎟️ My NFTs ({nfts.length})
        </button>
        <button
          className={`pb-2 text-sm font-medium transition-colors ${
            tab === "activity"
              ? "text-sky-400 border-b-2 border-sky-400"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
          onClick={() => setTab("activity")}
        >
          📊 Activity
        </button>
      </div>

      {/* Tab Content */}
      {tab === "nfts" ? (
        loadingOwnedNfts ? (
          <p className="text-sm text-zinc-400">Loading your NFTs…</p>
        ) : nfts.length === 0 ? (
          <p className="text-sm text-zinc-400">
            You don't own any 3 Word Pin NFTs yet. Claim one to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft) => (
              <div
                key={nft.id.toString()}
                className="border border-zinc-700 rounded-lg overflow-hidden bg-zinc-800/50 hover:border-zinc-500 transition-colors"
              >
                {nft.metadata.image && (
                  <img
                    src={nft.metadata.image.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/",
                    )}
                    alt={nft.metadata.name || `NFT #${nft.id.toString()}`}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-3">
                  <p className="font-medium text-zinc-100">
                    {nft.metadata.name || `#${nft.id.toString()}`}
                  </p>
                  {nft.metadata.description && (
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                      {nft.metadata.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="space-y-3 text-sm text-zinc-400">
          <p>📦 No recent activity yet.</p>
          <p>Your transactions and rental history will appear here.</p>
        </div>
      )}
    </section>
  );
}

export default Profile;