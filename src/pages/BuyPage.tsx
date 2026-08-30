import {
  getContract,
  type NFT,
} from "thirdweb";

import {
  useReadContract,
  useActiveAccount,
} from "thirdweb/react";

import {
  getNFTs,
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

  const name =
    metadata.name ||
    `3 Word Pin #${tokenId}`;

  const address =
    metadata.three_word_address ||
    metadata.threeWordAddress ||
    metadata.address ||
    "";

  const description =
    metadata.description ||
    "Unique 3 Word Pin location.";

  const image = ipfsToHttp(
    metadata.image as string | undefined
  );

  return {
    tokenId,
    name,
    address,
    description,
    image,
  };
}

export function BuyPage() {
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
  } = useReadContract(getNFTs, {
    contract,
    start: 0,
    count: 100,
  });

  const assets = (data as NFT[]) || [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          3 Word Pins
        </h1>

        <p className="mt-2 text-zinc-400">
          Own a unique 16×16 ft digital location.
        </p>

        {account && (
          <p className="mt-2 text-xs text-zinc-500">
            Connected: {account.address}
          </p>
        )}
      </header>

      {isLoading && (
        <div className="py-12 text-center text-zinc-400">
          Loading 3 Word Pins...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-400">
          Unable to load 3 Word Pins.
          <br />
          <span className="text-xs">
            {error.message}
          </span>
        </div>
      )}

      {!isLoading &&
        !error &&
        assets.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-xl font-semibold text-white">
              No Pins Available
            </h2>

            <p className="mt-2 text-zinc-400">
              Check back soon for new 3 Word Pins.
            </p>
          </div>
        )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {assets.map((asset) => {
          const pin = getPinMetadata(asset);

          return (
            <div
              key={pin.tokenId}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-sky-400/50"
            >

              {pin.image ? (
                <img
                  src={pin.image}
                  alt={pin.name}
                  className="h-52 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-52 items-center justify-center bg-zinc-800">
                  <span className="text-sm font-semibold tracking-widest text-zinc-500">
                    3 WORD PIN
                  </span>
                </div>
              )}

              <div className="p-5">

                <div className="flex items-start justify-between">

                  <div>
                    <h2 className="font-semibold text-white">
                      {pin.name}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      Token #{pin.tokenId}
                    </p>
                  </div>

                  <span className="rounded-full bg-sky-500/10 px-2 py-1 text-xs text-sky-400">
                    ERC-721
                  </span>

                </div>

                {pin.address && (
                  <div className="mt-4 rounded-lg bg-zinc-800 p-3">
                    <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                      3 Word Pin Address
                    </div>

                    <div className="mt-1 font-mono font-semibold text-sky-400">
                      {pin.address}
                    </div>
                  </div>
                )}

                <p className="mt-4 line-clamp-2 text-sm text-zinc-400">
                  {pin.description}
                </p>

                <div className="mt-5 flex gap-2">

                  <a
                    href={`/pin/${pin.tokenId}`}
                    className="flex-1 rounded-lg bg-gradient-to-r from-sky-500 to-purple-500 px-4 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
                  >
                    View Pin
                  </a>

                  <a
                    href={`https://basescan.org/token/${COLLECTION_ADDRESS}?a=${pin.tokenId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500"
                  >
                    3 Word Pin
                  </a>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
