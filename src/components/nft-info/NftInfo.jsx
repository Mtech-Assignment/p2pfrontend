import Loading from "../../subcomponents/loading/Loading.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

export default function NftInfo({ nftData, children }) {
  return (
    <MainLayout>
      {!nftData ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-2 mt-6 p-2 bg-white shadow-lg">
          <div className="">
            <img alt={"NFT Image"} className=" py-5 mx-auto" src={nftData?.image} />
          </div>
          <div className="flex flex-col justify-between p-7">
            <div className="space-y-3 my-5">
              <p className="text-6xl font-bold text-blue-500">
                {nftData?.name}
              </p>
              <p className="text-gray-600">{nftData?.description}</p>
              <p className="font-bold text-4xl text-green-500">
                {nftData?.price.toString()} CSDP
              </p>
            </div>
            <div>{children}</div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
