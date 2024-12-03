import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for React Router
import Card from "../../subcomponents/cards/Card.jsx";
import Loading from "../../subcomponents/loading/Loading.jsx";

export default function AllNFTs() {
  const navigate = useNavigate();  // Using useNavigate from react-router-dom
  const [allNFTs, setAllNFTs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to load all NFTs
  const loadAllNFTs = async () => {
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://scalable.services.com/marketplace/api/v1/marketplace/listing");
      const data = await response.json();

      // Check if the request was successful and the data contains NFTs
      if (data.success && data.listedNftList && data.listedNftList.listed_items) {
        setAllNFTs(data.listedNftList.listed_items); // Update state with listed NFTs
      } else {
        console.log("No NFTs found or error in response");
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    loadAllNFTs();  // Call loadAllNFTs when component mounts
  }, []);

  return (
      <div>
        {loading ? (
            <Loading />  // Show loading component while data is being fetched
        ) : (
            <div className="flex flex-row flex-wrap space-x-4 overflow-x-auto">
              {allNFTs.length > 0 ? (
                  allNFTs.map((nft, index) => (
                      <div key={index}>
                        <Card
                            nft={nft}
                            url="/nft/"
                            onClick={() => {
                              // Navigate to the individual NFT page using react-router
                              navigate(`/${nft.tokenId}`);
                              console.log("Onclicked on buy button.");
                            }}
                        />
                      </div>
                  ))
              ) : (
                  <div className="text-center font-semibold text-base">
                    No NFTs found
                  </div>
              )}
            </div>
        )}
      </div>
  );
}
