import {TbLayoutDashboard} from 'react-icons/tb'
import {HiTemplate} from 'react-icons/hi'
import {GiSellCard, GiToken} from 'react-icons/gi'
import { AiOutlineTransaction, AiFillCrown } from 'react-icons/ai';


export const navLinks = [
    {
        title: "Dashboard",
        link: "/",
        icon: TbLayoutDashboard
    },
    {
        title: "Create NFT",
        link: "/sell",
        icon: HiTemplate
    },
    {
        title: "My Owned NFTs",
        link: "/my-items",
        icon: AiFillCrown
    },
    {
        title: "Creator's Dashboard ",
        link: "/my-listed-items",
        icon: GiSellCard
    },
    {
        title: "Buy Token ",
        link: "/buy-token",
        icon: GiToken
    },
    {
        title: "Transactions ",
        link: "/transactions",
        icon: AiOutlineTransaction
    }
]
