import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate from React Router
import Card from "../../subcomponents/cards/Card.jsx";
import Heading3 from "../../subcomponents/headings/Heading3.jsx";
import Loading from "../../subcomponents/loading/Loading.jsx";
import BtnMain from "../../subcomponents/btns/BtnMain.jsx";

export default function SellerItems() {
    const navigate = useNavigate(); // Use navigate from React Router
    const [listedNFTs, setListedNFTs] = useState([]);
    // const [soldNFTs, setSoldNFTs] = useState([]);
    const [loading, setLoading] = useState(false);

    const userId = sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user")).id
        : null;

    const token = sessionStorage.getItem("token");

    // Function to fetch NFTs
    const loadMyNFTs = async () => {
        setLoading(true);
        try {
            // Fetch listed NFTs
            const nftResponse = await fetch(
                `http://scalable.services.com/marketplace/api/v1/user/${userId}/item?listed=true`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const nftData = await nftResponse.json();
            if (nftData.success) {
                // Get the listed NFTs array
                const listedNFTs = nftData.listed_items.listed_nfts;

                // Fetch additional details for each NFT
                const detailedNFTs = await Promise.all(
                    listedNFTs.map(async (nft) => {
                        const detailedNFTResponse = await fetch(
                            `http://scalable.services.com/digital-assets/api/v1/nft/${nft.tokenId}`,
                            {
                                method: "GET",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        const detailedNFTData = await detailedNFTResponse.json();

                        if (detailedNFTData.success && detailedNFTData.result) {
                            return {
                                ...nft,  // Existing NFT data
                                ...detailedNFTData.result.nft_info,  // Additional NFT details
                            };
                        }
                        return nft;  // If fetch fails, return original NFT
                    })
                );

                // Update the state with the fetched NFTs (both listed and detailed data)
                setListedNFTs(detailedNFTs);
            }
        } catch (error) {
            console.error("Error fetching NFTs:", error);
        } finally {
            setLoading(false);
        }
    };

    const buyNFT = (nft) => {
        console.log("Need to improve more", nft);
        // Implement buy logic here (e.g., interacting with blockchain or smart contracts)
    };

    // Call loadMyNFTs when the component mounts
    useEffect(() => {
        loadMyNFTs();
    }, []);

    return (
        <div>
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
                    {/*<div>*/}
                    {/*    <Heading3 title="Sold NFTs" />*/}
                    {/*    <div className="grid grid-cols-3 gap-4">*/}
                    {/*        {soldNFTs.length ? (*/}
                    {/*            soldNFTs.map((nft, index) => (*/}
                    {/*                <div key={index}>*/}
                    {/*                    <Card*/}
                    {/*                        nft={nft}*/}
                    {/*                        url="/my-listed-items/"*/}
                    {/*                        onClick={() => buyNFT(nft)}*/}
                    {/*                    />*/}
                    {/*                </div>*/}
                    {/*            ))*/}
                    {/*        ) : (*/}
                    {/*            <div className="font-semibold text-base text-center">*/}
                    {/*                No NFTs sold yet.*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            )}
        </div>
    );
}
