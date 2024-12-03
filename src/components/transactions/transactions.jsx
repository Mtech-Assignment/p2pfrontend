import { useState, useEffect } from "react";
import Loading from "../../subcomponents/loading/Loading.jsx";


export default function Transactions() {

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const loadTransactions = async () => {
    setLoading(true);

  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <div style={
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }>
        <div style={{ position: "relative" }}>
            <h1 style={{fontSize: 40, marginTop: 20, textAlign: "center"}}>Previous Transactions</h1>
            <h3 style={{fontSize: 30, marginTop: 10, textAlign: "center"}}>Address: {currentUserAddress}</h3>
        </div>
        {loading == true ? (
            <Loading />
        ) : (
            <div style={
                {
                    border: "1px solid black",
                    marginTop: 30,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    overflowY: "scroll",
                    marginBottom: 20
                }
            }>
                {transactions?.map((tx, index) =>
                    (
                        <div key={index} style={{marginBottom: 40}}>
                            <h1 style={{fontSize: 20}}>BlockNumber: {tx.blockNumber}</h1>
                            <h1 style={{fontSize: 20}}>TimeStamp: {tx.timeStamp}</h1>
                            <h1 style={{fontSize: 20}}>From: {tx.from}</h1>
                            <h1 style={{fontSize: 20}}>To: {tx.to}</h1>
                            <h1 style={{fontSize: 20}}>Value: {tx.value}</h1>
                            <h1 style={{fontSize: 20}}>Gas: {tx.gas}</h1>
                            <h1 style={{fontSize: 20}}>gasPrice: {tx.gasPrice}</h1>
                            <h1 style={{fontSize: 20}}>functionName: {tx.functionName}</h1>
                            <h1 style={{fontSize: 20}}>ContractAddress: {tx.contractAddress}</h1>
                            <h1 style={{fontSize: 20}}>GasUsed: {tx.gasUsed}</h1>
                        </div>
                    )
                )}
            </div>
        )}
    </div>
  );
}
