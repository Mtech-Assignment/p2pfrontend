import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Card from "../../subcomponents/cards/Card.jsx";
import Loading from "../../subcomponents/loading/Loading.jsx";

export default function MyItems() {
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  // Load NFTs for the connected user
  const loadMyNFTs = async () => {
    setLoading(true);

    try {
      // Fetch your NFTs here (you might want to replace the following mock code)
      // Example:
      // const response = await fetch("/api/getMyNFTs");
      // const data = await response.json();
      // setAllNFTs(data);

      // For now, we'll mock the NFTs:
      setAllNFTs([{ id: 1, name: "NFT #1", image: "url_to_image" }]);

      setError(""); // Reset any previous errors
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setError("Failed to load NFTs. Please check your wallet connection or try again later.");
      setAllNFTs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyNFTs();
  }, []);

  return (
      <div>
        {loading ? (
            <Loading />
        ) : (
            <div>
              {error && (
                  <div className="text-red-500 text-center font-semibold mb-4">
                    {error}
                    <button
                        className="ml-2 bg-blue-500 text-white py-1 px-3 rounded"
                        onClick={loadMyNFTs} // Retry loading NFTs
                    >
                      Retry
                    </button>
                  </div>
              )}
              {!error && (
                  <div className="flex flex-row space-x-4 overflow-x-auto">
                    {allNFTs.length ? (
                        allNFTs.map((nft, index) => (
                            <div key={index}>
                              {/*<Card*/}
                              {/*    nft={nft}*/}
                              {/*    url="/my-items/"*/}
                              {/*    onClick={() => buyNFT(nft)} // Ensure buyNFT function is defined*/}
                              {/*/>*/}
                            </div>
                        ))
                    ) : (
                        <div className="text-center font-semibold text-base">
                          No purchase history found.
                          <Link to="/buy-token"> Buy now some</Link> {/* Updated Link to React Router */}
                        </div>
                    )}
                  </div>
              )}
            </div>
        )}
      </div>
  );
}
