import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // useLocation added
import BtnMain from "../subcomponents/btns/BtnMain.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../components/nft-info/NftInfo";

export default function ListedItemDetailsPage() {
  const { id } = useParams(); // Get itemid from URL params
  const navigate = useNavigate(); // For redirecting to other routes
  const location = useLocation(); // Get the current path

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState(null); // Initially set to null to avoid issues with undefined
  const [isPurchasing, setIsPurchasing] = useState(false);

  // Load NFT data from backend API
  const loadNFT = async () => {
    setLoading(true);
    setIsPurchasing(false);

    try {
      const response = await fetch(`http://scalable.services.com/digital-assets/api/v1/nft/${id}`);
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
          tokenId: id, // Token ID could be same as itemid, update as needed
          seller: nft.owner, // Assuming owner as seller
          owner: nft.owner, // You may want to update how owner is determined
          image: metaData.image,
          name: metaData.name,
          description: metaData.description,
        };

        console.log("NFT data set:", item);
        setNftData(item);
      } else {
        console.error("Failed to fetch NFT data. Error:", data);
      }
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    }

    setLoading(false);
  };

  const buyNFT = async () => {
    setIsPurchasing(true);
    try {
      // Simulating purchase logic with a timeout
      setTimeout(() => {
        alert("NFT purchased!");
        setIsPurchasing(false);
        navigate("/my-items"); // Redirect to the "my-items" page after purchase
      }, 2000);
    } catch (error) {
      console.error("Error purchasing NFT:", error);
      setIsPurchasing(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadNFT();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if the path includes /my-items to conditionally render the button
  const isMyItemsPage = location.pathname.includes('/my-items');

  const resellNft = () =>{
    console.log('Hello', nftData)

  };
  return (
      <div>
        {nftData ? (
            <NftInfo nftData={nftData}>
              {/*{!isMyItemsPage && (*/}
              {/*    <BtnMain*/}
              {/*        text="Resell"*/}
              {/*        icon={<AiOutlineArrowRight className="text-2xl" />}*/}
              {/*        className="w-full"*/}
              {/*        onClick={buyNFT}*/}
              {/*        disabled={isPurchasing}*/}
              {/*    />*/}
              {/*)}*/}
                  <BtnMain
                      text="Resell"
                      icon={<AiOutlineArrowRight className="text-2xl" />}
                      className="w-full"
                      onClick={resellNft}
                  />
            </NftInfo>
        ) : (
            <div>No NFT data available.</div>
        )}
      </div>
  );
}
