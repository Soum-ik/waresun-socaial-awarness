import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import useImageUpload from "../hooks/useImageUpload";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function BusinessPromotionForm({ close }) {
    const token = Cookies.get('authToken');
    const UserName = Cookies.get('userInfo');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        owner: '',
        productsOrServices: '',
        logoOrProductImages: '',
    });

    const handleFormState = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleClose = () => {
        close();
    };

    const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
    const { file, error, handleChange, loading } = useImageUpload(apiKey);

    const handleForm = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || !formData.owner || !formData.productsOrServices) {
            alert('Fill all required fields first');
            return;
        }

        try {
            const completeFormData = {
                ...formData,
                logoOrProductImages: file,
                token,
              
            };

            const response = await fetch('http://localhost:4000/create-business-promotion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completeFormData),
            });

            const data = await response.json();
            if (data.status === 200) {
                Cookies.remove('Business');

                Cookies.set('Business', JSON.stringify(completeFormData));
                toast.success("Business promotion created successfully");
                handleClose();
            } else {
                console.error('Error creating business promotion:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating business promotion:', error);
        }
    };

    return <>
        <div className=" fixed z-50 inset-0 bg-black/40  flex items-center justify-center p-12">

            <div className="mx-auto  relative text-black  w-full max-w-[550px] rounded-lg shadow-xl bg-white">
                <CgClose onClick={handleClose} className=" absolute mt-3 right-4 mb-3 bg-slate-100 size-6 rounded-xl p-1 " />

                <form
                    className="py-3 px-4  max-h-[80vh] overflow-y-scroll"
                    onSubmit={handleForm}
                >
                    <h1 className=" text-center my-2 mb-5 font-semibold text-2xl">Promote Your Business</h1>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="mb-1 block text-xl font-medium "
                        >
                            Name
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.name}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter business name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="description"
                            className="mb-1 block text-xl font-medium "
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleFormState}
                            rows={5}
                            cols={2}
                            id="description"
                            placeholder="Enter business description"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="owner"
                            className="mb-1 block text-xl font-medium "
                        >
                            Owner
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.owner}
                            type="text"
                            name="owner"
                            id="owner"
                            placeholder="Enter owner name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="productsOrServices"
                            className="mb-1 block text-xl font-medium "
                        >
                            Products/Services
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.productsOrServices}
                            type="text"
                            name="productsOrServices"
                            id="productsOrServices"
                            placeholder="Enter products or services"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-xl font-medium">
                            Upload Logo/Product Images
                        </label>
                        <div className="mb-2">
                            <input type="file" name="file" id="file" onChange={handleChange} className="sr-only" />
                            <label
                                htmlFor="file"
                                className="relative flex min-h-[170px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center"
                            >
                                <div>
                                    <span className="block text-xl font-medium">
                                        Drop files here
                                    </span>
                                    <span className="block text-base font-medium text-[#6B7280]">
                                        Or
                                    </span>
                                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                        Browse
                                    </span>
                                </div>
                            </label>
                        </div>
                        {formData.logoOrProductImages && !file && <img className=" size-20" src={formData.logoOrProductImages} />}
                        {file && <img className=" size-20" src={file} />}
                        {error && <p className="text-red-600">{error}</p>}
                    </div>

                    <div>
                        <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-medium text-white outline-none">
                            {loading ? 'loading..' : `Submit`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>;

}

export default BusinessPromotionForm;
