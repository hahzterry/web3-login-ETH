"use client";

import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract, type NFT } from "thirdweb";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";

import { client, baseMainnet } from "../lib/chains";

// ─────────────────────────────────────────────────────────────
// 3 WORD PIN NFT CONTRACT
// ─────────────────────────────────────────────────────────────

// IMPORTANT:
// Replace this with the REAL ERC-721 contract address.
//
// Do NOT leave:
// 0xYourNftContractAddress
//
// Example:
// const NFT_CONTRACT_ADDRESS =
//   "0x1234567890123456789012345678901234567890";

const NFT_CONTRACT_ADDRESS =
  "0xYourNftContractAddress";

// Optional token IDs that grant verified status.
const VERIFIED_TOKEN_IDS = [
  1,
  42,
  777,
];

export function NftGallery() {
  const account =
    useActiveAccount();

  // ─────────────────────────────────────────────────────────
  // CONTRACT
  // ─────────────────────────────────────────────────────────

  const contract =
    getContract({
      client,
      address:
        NFT_CONTRACT_ADDRESS,
      chain: baseMainnet,
    });

  // ─────────────────────────────────────────────────────────
  // OWNED NFT QUERY
  // ─────────────────────────────────────────────────────────
  //
  // IMPORTANT:
  // Current thirdweb v5 syntax is:
  //
  // useReadContract(
  //   getOwnedNFTs,
  //   {
  //     contract,
  //     owner,
  //   },
  //   {
  //     enabled,
  //   }
  // )
  //
  // Do NOT pass null as the first argument.
  // ─────────────────────────────────────────────────────────

  const {
    data: ownedNFTs,
    isLoading,
    error,
  } = useReadContract(
    getOwnedNFTs,
    {
      contract,
      owner:
        account?.address ??
        "0x0000000000000000000000000000000000000000",
    },
    {
      enabled: !!account,
    },
  );

  // ─────────────────────────────────────────────────────────
  // NOT CONNECTED
  // ─────────────────────────────────────────────────────────

  if (!account) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            🔗
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              Connect Your Wallet
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Connect your wallet to verify your
              3 Word Pin NFTs.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-sky-400" />

          <p className="text-sm text-zinc-400">
            Checking your 3 Word Pin NFTs…
          </p>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────
  // ERROR
  // ─────────────────────────────────────────────────────────

  if (error) {
    return (
      <section className="rounded-xl border border-red-900/50 bg-zinc-900 p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">
            ⚠️
          </div>

          <div>
            <h2 className="font-semibold text-red-300">
              Could not load NFTs
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Check that your NFT contract address
              is correct and deployed on Base.
            </p>

            <p className="mt-3 break-all text-xs text-zinc-600">
              {error instanceof Error
                ? error.message
                : String(error)}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────
  // NORMALIZE NFT DATA
  // ─────────────────────────────────────────────────────────

  const nfts =
    (ownedNFTs ?? []) as NFT[];

  // ─────────────────────────────────────────────────────────
  // NO NFTS
  // ─────────────────────────────────────────────────────────

  if (nfts.length === 0) {
    return (
      <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">
            🎟️
          </div>

          <div>
            <h2 className="text-xl font-semibold text-sky-400">
              My 3 Word Pin NFTs
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              You don't own any 3 Word Pin NFTs yet.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
          <p className="text-sm text-zinc-500">
            Claim a 3 Word Pin NFT to unlock
            holder benefits.
          </p>
        </div>
      </section>
    );
  }

  // ─────────────────────────────────────────────────────────
  // VERIFIED HOLDER
  // ─────────────────────────────────────────────────────────

  const hasVerifiedNFT =
    nfts.some((nft) =>
      VERIFIED_TOKEN_IDS.includes(
        Number(nft.id),
      ),
    );

  // ─────────────────────────────────────────────────────────
  // NFT IMAGE HELPER
  // ─────────────────────────────────────────────────────────

  const getImageUrl = (
    image?: string,
  ) => {
    if (!image) {
      return null;
    }

    if (
      image.startsWith(
        "ipfs://",
      )
    ) {
      return image.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/",
      );
    }

    return image;
  };

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────

  return (
    <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-xl">
            🎟️
          </div>

          <div>
            <h2 className="text-xl font-semibold text-sky-400">
              My 3 Word Pin NFTs
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              {nfts.length} NFT
              {nfts.length === 1
                ? ""
                : "s"} detected
            </p>
          </div>

        </div>

        {hasVerifiedNFT && (
          <span className="shrink-0 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-300">
            ✔ Verified Holder
          </span>
        )}

      </div>

      {/* NFT GRID */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {nfts.map((nft) => {
          const imageUrl =
            getImageUrl(
              nft.metadata.image,
            );

          const tokenId =
            nft.id.toString();

          const name =
            nft.metadata.name ||
            `NFT #${tokenId}`;

          return (
            <div
              key={tokenId}
              className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800/50"
            >

              {/* IMAGE */}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={name}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              )}

              {/* CONTENT */}
              <div className="p-4">

                <div className="flex items-center justify-between gap-3">

                  <p className="font-medium text-zinc-100">
                    {name}
                  </p>

                  {VERIFIED_TOKEN_IDS.includes(
                    Number(nft.id),
                  ) && (
                    <span className="shrink-0 text-xs text-green-400">
                      ✓
                    </span>
                  )}

                </div>

                <p className="mt-1 text-xs text-zinc-500">
                  Token #{tokenId}
                </p>

                {nft.metadata.description && (
                  <p className="mt-2 line-clamp-2 text-xs text-zinc-400">
                    {nft.metadata.description}
                  </p>
                )}

              </div>

            </div>
          );
        })}

      </div>

      {/* HOLDER REWARD */}
      {hasVerifiedNFT && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">

          <div className="flex items-center gap-3">

            <div className="text-2xl">
              🎁
            </div>

            <div className="flex-1">

              <p className="font-semibold text-green-300">
                Verified Holder Reward
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Your NFT qualifies for the
                1,000 $LUV holder reward.
              </p>

            </div>

          </div>

          <button
            type="button"
            className="mt-4 w-full rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
            onClick={() =>
              alert(
                "🎁 1,000 $LUV reward claimed!",
              )
            }
          >
            🎁 Claim 1,000 $LUV
          </button>

        </div>
      )}

    </section>
  );
}

export default NftGallery;