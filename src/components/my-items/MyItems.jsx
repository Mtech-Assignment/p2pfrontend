import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Loading from "../../subcomponents/loading/Loading.jsx";
import OwnedCards from "../../subcomponents/cards/OwnedCards.jsx";

export default function MyItems() {
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  // Load NFTs for the connected user
  const loadMyNFTs = async () => {
    setLoading(true);

    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("user")
          ? JSON.parse(sessionStorage.getItem("user")).id
          : null;
      if (!token) {
        setError("No authentication token found. Please log in again.");
        setAllNFTs([]);
        return;
      }

      // Make the API call to get user-owned NFTs
      const response = await fetch(`http://scalable.services.com/marketplace/api/v1/user/${userId}/item`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch NFTs.");
      }

      const data = await response.json();
      if (data.success) {
        setAllNFTs(data.userOwnedNfts.owned_nft_items);
        setError(""); // Reset any previous errors
      } else {
        setError("No NFTs found.");
        setAllNFTs([]);
      }
    } catch (error) {
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
                              <OwnedCards
                                  nft={{
                                    id: nft.item._id,
                                    itemId: nft.item_id,
                                    name: nft.item.name,
                                    image: nft.item.tokenDetailURI, // You can display the image from the tokenDetailURI
                                    description: nft.item.description,
                                    price: nft.item.price,
                                  }}
                                  url="/my-items/"
                                  // onClick={() => buyNFT(nft)} // Ensure buyNFT function is defined
                              />
                            </div>
                        ))
                    ) : (
                        <div className="text-center font-semibold text-base">
                          No NFTs found.
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

