import { useState, useEffect } from "react";
import { useRouter } from "react-router";
import BtnMain from "../../subcomponents/btns/BtnMain.jsx";
import { AiOutlineArrowRight } from "react-icons/ai";
import NftInfo from "../../components/nft-info/NftInfo.jsx";

export default function Itemid() {
  const router = useRouter();
  let { itemid } = router.query;

  const [loading, setLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const loadNFT = async () => {
    setLoading(true);
    setIsPurchasing(true)

    setLoading(false);
    setIsPurchasing(false)
  };

  const buyNFT = async (price, tokenId) => {
    setIsPurchasing(true)
    await router.push("/my-items");
    setIsPurchasing(false)
  };

  useEffect(() => {
    const load = async () => {
      if (router.query.itemid) await loadNFT();
    };
    load();
  }, [itemid]);

  return (
    <div>
      <NftInfo nftData={nftData}>
        <BtnMain
          text="Buy Now"
          icon={<AiOutlineArrowRight className="text-2xl" />}
          className="w-full"
          onClick={() => buyNFT(nftData.price.toString(), itemid)}
          disabled={isPurchasing}
        />
      </NftInfo>
    </div>
  );
}
