// Mariano Montini ('bosque', 'bosquestudio')
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { client, baseMainnet } from "../lib/chains"; // import client too

// Replace with your actual 3 Word Pin NFT contract address
const NFT_CONTRACT_ADDRESS = "0xYourNftContractAddress";

// Optional: token IDs that grant "verified" status
const VERIFIED_TOKEN_IDS = [1, 42, 777];

export function NftGallery() {
  const account = useActiveAccount();
  const contract = getContract({
    client,
    address: NFT_CONTRACT_ADDRESS,
    chain: baseMainnet,
  });

  const { data: ownedNFTs, isLoading, error } = useReadContract(
    account ? getOwnedNFTs({ contract, owner: account.address }) : undefined,
  );

  // Not connected
  if (!account) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">
          🔗 Connect your wallet to verify your 3 Word Pin NFTs.
        </p>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">Checking your NFTs…</p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-red-400">
          ❌ Could not load NFTs. Please check the contract address.
        </p>
      </section>
    );
  }

  // No NFTs owned
  if (!ownedNFTs || ownedNFTs.length === 0) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h2 className="text-xl font-semibold text-sky-400 mb-3">
          🎟️ My 3 Word Pin NFTs
        </h2>
        <p className="text-sm text-zinc-400">
          You don't own any 3 Word Pin NFTs yet. Claim one to unlock benefits.
        </p>
      </section>
    );
  }

  // Check for verified NFTs
  const hasVerifiedNFT = ownedNFTs.some((nft) =>
    VERIFIED_TOKEN_IDS.includes(Number(nft.id)),
  );

  // Display owned NFTs
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-sky-400">
          🎟️ My 3 Word Pin NFTs
        </h2>
        {hasVerifiedNFT && (
          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
            ✔ Verified Holder
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ownedNFTs.map((nft) => (
          <div
            key={nft.id.toString()}
            className="border border-zinc-700 rounded-lg overflow-hidden bg-zinc-800/50"
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

      {hasVerifiedNFT && (
        <button
          className="w-full py-2 bg-gradient-to-r from-sky-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          onClick={() => alert("🎁 1,000 $LUV reward claimed!")}
        >
          🎁 Claim 1,000 $LUV (Holder Reward)
        </button>
      )}
    </section>
  );
}

export default NftGallery;