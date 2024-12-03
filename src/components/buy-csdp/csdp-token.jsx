import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useRouter
import BtnMain from "../../subcomponents/btns/BtnMain.jsx";
import { AiOutlineArrowUp } from "react-icons/ai";
import Input from "./Input.jsx";
import Loading from "../../subcomponents/loading/Loading.jsx";

export default function CSDPToken() {
  const navigate = useNavigate(); // useNavigate for navigation

  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0.0);
  const [csdpTokenAmount, setCsdpTokenAmount] = useState(0);
  const [priceInEther, setPriceInEther] = useState(0);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const loadCSDPBalance = async () => {
    setLoading(true);

    // Simulating loading of the CSDP balance
    setCurrentBalance(1000); // Placeholder for actual balance fetching logic
    setLoading(false);
  };

  const buyCSDP = async () => {
    setIsPurchasing(true);
    setLoading(true);

    // Simulate purchase action
    setTimeout(() => {
      setLoading(false);
      setIsPurchasing(false);
    }, 2000); // Simulate 2 second loading time
  };

  useEffect(() => {
    loadCSDPBalance();
  }, []);

  return (
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
      >
        <h1 style={{ fontSize: 40, marginTop: 20, textAlign: "center" }}>
          Buy CSDP using Ether
        </h1>
        <h3 style={{ fontSize: 30, marginTop: 10, textAlign: "center" }}>
          Current balance: {currentBalance} CSDP
        </h3>

        {loading ? (
            <Loading />
        ) : (
            <div
                style={{
                  marginTop: 50,
                  fontSize: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: 610,
                }}
            >
              <Input
                  id="csdp-amount"
                  placeholder="Input up to 15 decimal places"
                  label="Token Amount"
                  value={csdpTokenAmount}
                  onChange={(e) => {
                    setCsdpTokenAmount(e.target.value);
                    setPriceInEther(e.target.value / 1000);
                  }}
              />
              <Input
                  id="csdp-price-in-ether"
                  placeholder="e.g 1/2/3..."
                  label="Ether Amount"
                  value={priceInEther}
                  onChange={(e) => {
                    setPriceInEther(e.target.value);
                    setCsdpTokenAmount(e.target.value * 1000);
                  }}
              />
              {!isPurchasing && (
                  <BtnMain
                      text="Buy Now"
                      icon={<AiOutlineArrowUp className="text-2xl" />}
                      className="text-lg w-full"
                      onClick={buyCSDP}
                  />
              )}
            </div>
        )}
      </div>
  );
}
