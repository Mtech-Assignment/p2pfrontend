import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import BtnMain from '../btns/BtnMain';

const Card = ({ nft, url = "/" }) => {
    const navigate = useNavigate(); // Using navigate from react-router-dom
    const [imageUrl, setImageUrl] = useState("");  // State to store the image URL
    const [tokenName, setTokenName] = useState("");
    // Fetch the image URL for the NFT using the tokenId
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const response = await fetch(`http://scalable.services.com/digital-assets/api/v1/nft/${nft.tokenId}`);
                const data = await response.json();
                const image = await fetch(data.result.nft_info.tokenDetailURI)
                const imageData = await image.json();

                if (data.success && data.result && data.result.nft_info.tokenDetailURI) {
                    setImageUrl(imageData.image);
                    setTokenName(imageData.name)
                } else {
                    console.error("Image not found for this NFT");
                    setImageUrl("https://via.placeholder.com/300");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
                setImageUrl("https://via.placeholder.com/300");
            }
        };

        fetchImageUrl();
    }, [nft.tokenId]);  // Re-run when nft.tokenId changes

    const handleViewMore = () => {
        navigate(`${url}${nft.tokenId}/${nft._id}`);
    };

    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg m-10">
            <img
                className="rounded-t-lg cursor-pointer object-cover w-96 h-72"
                src={imageUrl || "https://via.placeholder.com/300"}
                alt={tokenName || `NFT ${nft.tokenId}`}
                onClick={handleViewMore}
            />
            <div className="p-5">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-sky-600">
                    {tokenName || `NFT ${nft.tokenId}`}
                </h5>
                <p className="mb-3 h-4 font-normal text-gray-600">
                    {nft.description ? nft.description.substring(0, 30) + "..." : "No description available"}
                </p>
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-sky-800">
                    {nft.price ? `${nft.price} CSDP` : "Price not available"}
                </h5>
                <BtnMain
                    text="View More"
                    icon={<AiOutlineArrowRight className="text-2xl" />}
                    className="w-full"
                    onClick={handleViewMore}
                />
            </div>
        </div>
    );
};

export default Card;
