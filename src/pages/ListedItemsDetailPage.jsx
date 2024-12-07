import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // useLocation added
import BtnMain from "../subcomponents/btns/BtnMain.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../components/nft-info/NftInfo";
import axios from "axios";

export default function ListedItemsDetailPage() {
    const { tokenId, itemId } = useParams(); // Get itemid from URL params
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
            const response = await fetch(`http://scalable.services.com/digital-assets/api/v1/nft/${tokenId}`);
            if (!response.ok) {
                console.error("Failed to fetch NFT data, status:", response.status);
                return;
            }

            const data = await response.json();
            if (data.success) {
                const nft = data.result.nft_info;
                console.log(nft);
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

    // const buyNFT = async () => {
    //     setIsPurchasing(true);
    //     try {
    //         // Simulating purchase logic with a timeout
    //         setTimeout(() => {
    //             alert("NFT purchased!");
    //             setIsPurchasing(false);
    //             navigate("/my-items"); // Redirect to the "my-items" page after purchase
    //         }, 2000);
    //     } catch (error) {
    //         console.error("Error purchasing NFT:", error);
    //         setIsPurchasing(false);
    //     }
    // };

    useEffect(() => {
        if (tokenId) {
            loadNFT();
        }
    }, [tokenId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Check if the path includes /my-items to conditionally render the button
    const isMyItemsPage = location.pathname.includes('/my-items');

    const buyNft = async () => {
        const token = sessionStorage.getItem("token");
        setIsPurchasing(true);
        const response = await axios.put(
            `http://scalable.services.com/marketplace/api/v1/marketplace/${itemId}/buy`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if(response.data.success === true ) {
            navigate("/my-items");
        }
    };
    return (
        <div>
            {isPurchasing ? (
                <div className="reselling-message">
                    Buying on the way...
                </div>
            ) : (
                nftData ? (
                    <NftInfo nftData={nftData}>
                        <BtnMain
                            text="Buy Now"
                            icon={<AiOutlineArrowRight className="text-2xl"/>}
                            className="w-full"
                            onClick={buyNft}
                        />
                    </NftInfo>
                ) : (
                    <div>No NFT data available.</div>
                )
            )}
        </div>

    );
}
