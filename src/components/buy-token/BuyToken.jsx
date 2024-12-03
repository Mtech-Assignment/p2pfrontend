import { useEffect, useState } from "react";
import Loading from "../../subcomponents/loading/Loading.jsx";
import Card from "../../subcomponents/cards/Card.jsx";

export default function BuyToken() {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNFTs();
    }, []);

    const loadNFTs = async () => {
        setNfts(nfts);
        setLoading(false);
    };

    const buyNFT = async (nft) => {

        loadNFTs(); // Reload NFTs after purchase
    };

    if (loading) return <Loading />;

    return (
        <div>
            <h1>Buy Tokens</h1>
            <div className="grid">
                {nfts.map((nft) => (
                    <Card key={nft.tokenId}>
                        <img src={nft.image} alt={nft.name} />
                        <h2>{nft.name}</h2>
                        <p>{nft.description}</p>
                        <p>Price: {nft.price} ETH</p>
                        <button onClick={() => buyNFT(nft)}>Buy</button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
