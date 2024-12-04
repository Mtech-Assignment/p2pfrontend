import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate from React Router
import Card from "../../subcomponents/cards/Card.jsx";
import Heading3 from "../../subcomponents/headings/Heading3.jsx";
import Loading from "../../subcomponents/loading/Loading.jsx";
import BtnMain from "../../subcomponents/btns/BtnMain.jsx";

export default function SellerItems() {
  const navigate = useNavigate(); // Use navigate from React Router
  const [listedNFTs, setListedNFTs] = useState([]);
  const [soldNFTs, setSoldNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  // Simulate fetching NFT data for demo purposes
  const loadMyNFTs = async () => {
    setLoading(true);
    try {
      // Replace with actual API call or blockchain fetch logic
      // Simulating some fake data for now
      const listed = [
        { tokenId: "1", name: "NFT 1", image: "/images/nft1.jpg", description: "Description 1", price: 10 },
        { tokenId: "2", name: "NFT 2", image: "/images/nft2.jpg", description: "Description 2", price: 20 },
      ];
      const sold = [
        { tokenId: "3", name: "NFT 3", image: "/images/nft3.jpg", description: "Description 3", price: 30 },
      ];

      // Simulating delay
      setTimeout(() => {
        setListedNFTs(listed);
        setSoldNFTs(sold);
        setLoading(false);
      }, 2000); // Simulate 2-second delay
    } catch (error) {
      console.error("Error loading NFTs:", error);
      setLoading(false);
    }
  };

  // Handle wallet connection logic
  const connectWallet = () => {
    // Simulate wallet connection, you would replace this with your wallet connection logic
    setConnected(true);
    loadMyNFTs(); // Fetch NFTs after connection
  };

  useEffect(() => {
    if (connected) {
      loadMyNFTs();
    }
  }, [connected]);

  const buyNFT = (nft) => {
    console.log("Buying NFT", nft);
    // Implement buy logic here (e.g., interacting with blockchain or smart contracts)
  };

  return (
      <div>
        {!connected ? (
            <div className="text-center">
              <h2>Please connect your wallet to view your NFTs.</h2>
              <BtnMain text="Connect Wallet" onClick={connectWallet} />
            </div>
        ) : (
            <>
              {loading ? (
                  <Loading />  // Show loading spinner while fetching
              ) : (
                  <div>
                    {/* Listed NFTs Section */}
                    <div>
                      <Heading3 title="Listed NFTs" />
                      <div className="grid grid-cols-3 gap-4">
                        {listedNFTs.length ? (
                            listedNFTs.map((nft, index) => (
                                <div key={index}>
                                  <Card
                                      nft={nft}
                                      url="/my-listed-items/"
                                      onClick={() => buyNFT(nft)}
                                  />
                                </div>
                            ))
                        ) : (
                            <div className="font-semibold text-base text-center">
                              No Listed NFTs found.{" "}
                              <BtnMain text="List Now" onClick={() => navigate("/createnft")} />
                            </div>
                        )}
                      </div>
                    </div>

                    {/* Sold NFTs Section */}
                    <div>
                      <Heading3 title="Sold NFTs" />
                      <div className="grid grid-cols-3 gap-4">
                        {soldNFTs.length ? (
                            soldNFTs.map((nft, index) => (
                                <div key={index}>
                                  <Card
                                      nft={nft}
                                      url="/my-listed-items/"
                                      onClick={() => buyNFT(nft)}
                                  />
                                </div>
                            ))
                        ) : (
                            <div className="font-semibold text-base text-center">
                              No NFTs sold yet.
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
              )}
            </>
        )}
      </div>
  );
}
