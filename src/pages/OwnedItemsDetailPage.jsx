import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useLocation added
import BtnMain from "../subcomponents/btns/BtnMain.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../components/nft-info/NftInfo";
import axios from "axios";

export default function OwnedItemsDetailPage() {
  const { tokenId, itemId } = useParams(); // Get itemid from URL params
  const navigate = useNavigate(); // For redirecting to other routes
  // const location = useLocation(); // Get the current path
  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState(null); // Initially set to null to avoid issues with undefined
  const [isReselling, setIsReselling] = useState(false);
  const[amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setAmount(event.target.value);
  };
  // Load NFT data from backend API
  const loadNFT = async () => {
    setLoading(true);
    setIsReselling(false);

    try {
      const response = await fetch(`http://scalable.services.com/digital-assets/api/v1/nft/${tokenId}`);
      if (!response.ok) {
        console.error("Failed to fetch NFT data, status:", response.status);
        return;
      }

      const data = await response.json();
      if (data.success) {
        const nft = data.result.nft_info;

        // Fetch metadata from the tokenDetailURI (IPFS)
        const metaDataResponse = await fetch(nft.tokenDetailURI);
        const metaData = await metaDataResponse.json();

        // Process and set the NFT data
        const item = {
          price: nft.price, // Assuming price is already formatted
          tokenId: tokenId, // Token ID could be same as itemid, update as needed
          seller: nft.owner, // Assuming owner as seller
          owner: nft.owner, // You may want to update how owner is determined
          image: metaData.image,
          name: metaData.name,
          description: metaData.description,
        };

        setNftData(item);
      } else {
        console.error("Failed to fetch NFT data. Error:", data);
      }
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (tokenId) {
      loadNFT();
    }
  }, [tokenId]);

  if (loading) {
    return <div className="loading-screen">
      <div className="loading-text">Loading...</div>
    </div>
  }

  // Check if the path includes /my-items to conditionally render the button
  // const isMyItemsPage = location.pathname.includes('/my-items');

  const resellNft = async () => {
    const token = sessionStorage.getItem("token");
    setIsReselling(true);
    const response = await axios.put(
        `http://scalable.services.com/marketplace/api/v1/marketplace/${itemId}/resell`,
        {
          resell_price: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensuring the file is sent as multipart/form-data
          },
        }
    );
    if(response.data.success === true ) {
      navigate("/");
    }
  };
  return (
      <div>
        {isReselling ? (
            <div className="reselling-message">
              Reselling on the way...
            </div>
        ) : (
            nftData ? (
                <NftInfo nftData={nftData}>
                  <label htmlFor="amount" className="label-amount">Enter Resell Amount:</label>
                  <input
                      type="number"
                      id="amount"
                      name="Amount"
                      className="input-field"
                      min="1"
                      max="100"
                      step="1"
                      onChange={handleChange}
                      placeholder="01"
                  />

                  <BtnMain
                      text="Resell"
                      icon={<AiOutlineArrowRight className="text-2xl"/>}
                      className="btn-main w-full"
                      onClick={resellNft}
                  />
                </NftInfo>
            ) : (
                <div className="no-nft-data">No NFT data available.</div>
            )
        )}
      </div>
  );
}
