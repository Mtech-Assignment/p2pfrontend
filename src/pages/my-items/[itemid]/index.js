import { useState, useEffect } from "react";
import { useRouter } from "react-router";
import BtnMain from "../../../subcomponents/btns/BtnMain.jsx";
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import NftInfo from "../../../components/nft-info/NftInfo.jsx";
import Input from "../../../subcomponents/inputs/Input.jsx";

export default function MyItemId() {
  const router = useRouter();
  let { itemid } = router.query;

  const [_, setLoading] = useState(false);
  const [nftData, setNftData] = useState();
  const [resellPrice, setResellPrice] = useState("");
  const [isReselling, setIsReselling] = useState(false);
  const [isListing, setIsListing] = useState(false);

  const loadNFT = async () => {
    setLoading(true);
    setLoading(false);
  };

  const resellNFT = async (price, tokenId) => {
    setIsListing(true);
    setIsListing(false);
    await router.push("/my-listed-items");
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
          text={isReselling ? "Cancel" : "ReSell NFT"}
          icon={<AiOutlineArrowRight className="text-2xl" />}
          className="bg-blue-500"
          onClick={() => setIsReselling(!isReselling)}
        />
        {isReselling && (
          <div>
            <Input
              id="resellprice"
              placeholder="e.g.10 (In CSDP)"
              label="Resell Price"
              onChange={(e) => setResellPrice(e.target.value)}
            />
            <BtnMain
              text="List NFT"
              icon={<AiOutlineArrowUp className="text-2xl" />}
              className="text-lg w-full"
              onClick={() => resellNFT(resellPrice, nftData.tokenId)}
              disabled={isListing}
            />
          </div>
        )}
      </NftInfo>
    </div>
  );
}
