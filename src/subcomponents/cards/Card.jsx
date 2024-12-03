import React from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowRight } from 'react-icons/ai';
import BtnMain from '../btns/BtnMain';

const Card = ({ nft, url = "/" }) => {
    const history = useNavigate();

    const handleViewMore = () => {
        history.push(`${url}${nft.tokenId}`);
        console.log(`${url}${nft.tokenId}`);
    };

    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-lg m-10">
            <img
                className="rounded-t-lg cursor-pointer object-cover w-96 h-72"
                src={nft.image}
                alt={nft.name}
                onClick={() => history.push(`${url}${nft.tokenId}`)}
            />
            <div className="p-5">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-sky-600">
                    {nft.name}
                </h5>
                <p className="mb-3 h-4 font-normal text-gray-600">
                    {nft.description.substring(0, 30) + "..."}
                </p>
                <h5 className="mb-2 text-xl font-semibold tracking-tight text-sky-800">
                    {nft.price.toString()} CSDP
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
