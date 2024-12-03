import { useState } from "react";
import Input from "../../subcomponents/inputs/Input.jsx";
import { AiOutlineArrowUp } from "react-icons/ai";
import BtnMain from "../../subcomponents/btns/BtnMain.jsx";

export default function ListItem() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        file: null,
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
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
