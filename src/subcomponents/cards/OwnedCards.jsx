import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import BtnMain from '../btns/BtnMain';

const OwnedCards = ({ nft, url = "/" }) => {
    const navigate = useNavigate(); // Using navigate from react-router-dom
    const [imageUrl, setImageUrl] = useState("");  // State to store the image URL
    const [tokenName, setTokenName] = useState("");

    // Fetch the image URL for the NFT using the
    useEffect(() => {
        const fetchImageUrl = async () => {
            try {
                const image = await fetch(nft.image)
                const imageData = await image.json();

                    setImageUrl(imageData.image);
                    setTokenName(imageData.name)
            } catch (error) {
                console.error("Error fetching image:", error);
                setImageUrl("https://via.placeholder.com/300");
            }
        };

        fetchImageUrl();
    }, [nft.tokenId]);
    console.log("Nft is ",nft.itemId);
    const handleViewMore = () => {
        navigate(`${url}nft/${nft.id}/${nft.itemId}`);
    };

    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg m-10">
            <img
                className="rounded-t-lg cursor-pointer object-cover w-96 h-72"
                src={imageUrl || "https://via.placeholder.com/300"}
                alt={nft.id || `NFT ${nft.tokenId}`}
                onClick={handleViewMore}
            />
            <div className="p-5">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-sky-600">
                    {tokenName || `NFT ${nft.tokenId}`}
                </h5>
                <p className="mb-3 h-4 font-normal text-gray-600">
                    {nft.description ? nft.description.substring(0, 20) + "..." : "No description available"}
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

export default OwnedCards;
