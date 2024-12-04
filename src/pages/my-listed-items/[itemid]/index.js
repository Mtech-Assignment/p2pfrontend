import { useState, useEffect } from "react";
import { useRouter } from "react-router";
import BtnMain from "../../../subcomponents/btns/BtnMain.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../../../components/nft-info/NftInfo.jsx";

export default function ListedNFTItemId() {
  const router = useRouter();
  let { itemid } = router.query;

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();

  const loadNFT = async () => {
    setLoading(false);
  };

  const buyNFT = async (price, tokenId) => {
    setLoading(true);
    await router.push("/my-items");
  };

  useEffect(() => {
    const load = async () => {
      if (router.query.itemid) {
        await loadNFT();
      }
    };
    load();
  }, [itemid]);

  return (
    <div>
      <NftInfo nftData={nftData}>
        {!loading && nftData && !nftData.sold && <BtnMain
          text="Buy Back"
          icon={<AiOutlineArrowRight className="text-2xl" />}
          className="w-full"
          onClick={() => buyNFT(nftData.price.toString(), nftData.tokenId)}
        />}
      </NftInfo>
    </div>
  );
}
