import { useState, useEffect } from "react";
import Loading from "../../subcomponents/loading/Loading";

export default function Transactions() {

    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from backend API
    const loadTransactions = async () => {
        setLoading(true);

        // Get the token from sessionStorage
        const token = sessionStorage.getItem("token");
        if (!token) {
            console.error("No token found in session storage");
            setLoading(false);
            return;
        }

        try {
            // Fetch the transactions data from the backend
            const response = await fetch("http://scalable.services.com/payment/api/v1/token/transaction", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            // Check if the response is ok
            if (!response.ok) {
                throw new Error("Failed to fetch transactions");
            }

            const data = await response.json();

            // Ensure that the response contains transaction data
            if (data.success && data.transactions) {
                setTransactions(data.transactions); // Store transactions in state
            } else {
                console.error("No transactions found in the response");
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadTransactions();
    }, []);

    // Function to convert wei to ether (no ethers.js, just plain math)
    const convertWeiToEther = (weiValue) => {
        return (weiValue / 1e18).toFixed(18); // Converts from wei to ether (returns string with 18 decimals)
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
                <h1 style={{ fontSize: 40, marginTop: 20, textAlign: "center" }}>Previous Transactions</h1>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div
                    style={{
                        border: "1px solid black",
                        marginTop: 30,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        overflowY: "scroll",
                        marginBottom: 20,
                        maxHeight: "400px", // Added max height for scrolling
                        width: "80%", // Adjust width as needed
                    }}
                >
                    {transactions?.map((tx, index) => (
                        <div key={index} style={{ marginBottom: 20, padding: 10, borderBottom: "1px solid #ccc", width: "100%" }}>
                            <h2 style={{ fontSize: 18 }}>Transaction {index + 1}</h2>
                            <p style={{ fontSize: 16 }}><strong>From:</strong> {tx.from}</p>
                            <p style={{ fontSize: 16 }}><strong>To:</strong> {tx.to}</p>
                            <p style={{ fontSize: 16 }}><strong>Value:</strong> {convertWeiToEther(tx.value)} ETH</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
