import { useState } from "react";
import Input from "../../subcomponents/inputs/Input.jsx";
import { AiOutlineArrowUp } from "react-icons/ai";
import BtnMain from "../../subcomponents/btns/BtnMain.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function ListItem() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        file: null,
    });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            file: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are filled
        if (!formData.name || !formData.price || !formData.file) {
            alert("Please fill in all the required fields.");
            return;
        }

        const token = sessionStorage.getItem("token"); // Get the Bearer token from sessionStorage
        if (!token) {
            alert("No token found. Please log in again.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("file", formData.file);

        try {
            // POST request to API
            const response = await axios.post(
                "http://scalable.services.com/digital-assets/api/v1/nft/mint",
                formDataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data", // Ensuring the file is sent as multipart/form-data
                    },
                }
            );

            // If the request is successful, navigate to /my-items
            console.log("NFT Minted Successfully", response.data);
            navigate("/my-items");
        } catch (error) {
            console.error("Error minting NFT:", error);
            alert("An error occurred while listing the NFT. Please try again.");
        }
    };

    return (
        <div className="flex justify-center">
            <div className="md:w-3/6">
                <form onSubmit={handleSubmit}>
                    <Input
                        id="name"
                        name="name"
                        placeholder="e.g.Monkey"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <Input
                        id="description"
                        name="description"
                        placeholder="e.g.This is the most unique monkey in the world."
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Input
                        id="price"
                        name="price"
                        placeholder="e.g.10 (In CSDP)"
                        label="Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <Input
                        id="file"
                        name="file"
                        placeholder="Choose image file"
                        label="NFT Image"
                        type="file"
                        onChange={handleFileChange}
                    />
                    {formData.file && (
                        <img
                            className="rounded-xl mt-4 mb-10 w-96"
                            src={URL.createObjectURL(formData.file)}
                            alt="Chosen image"
                        />
                    )}
                    <BtnMain
                        text="List NFT"
                        icon={<AiOutlineArrowUp className="text-2xl" />}
                        className="w-full text-lg"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
}
