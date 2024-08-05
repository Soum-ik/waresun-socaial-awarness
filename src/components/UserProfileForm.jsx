import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import useImageUpload from "../hooks/useImageUpload";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { api } from "../libs/serverChecking";

function UserProfileForm({ close }) {
    const token = Cookies.get('authToken');
    const UserName = Cookies.get('userInfo');

    const userObject = Cookies.get('userObject');
    const parseData = userObject ? JSON.parse(userObject) : {};

    const [formData, setFormData] = useState({
        name: parseData.name || "",
        email: parseData.email || "",
        profile: parseData.profile || "",
    });


    // handle state
    const handleFormState = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // close model
    const handleClose = () => {
        close();
    };

    // api key imagebbb
    const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";

    // custom hook for upload image
    const { file, error, handleChange, loading } = useImageUpload(apiKey);


    // handleform

    // Handle form submission
    const handleForm = async (e) => {
        e.preventDefault();


        try {
            const completeFormData = {
                ...formData,
                profile: file,
            };

            console.log(completeFormData, 'complete form');

            // Example POST request to your server
            const response = await fetch(`${api.config}update-user/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completeFormData),
            });
            const data = await response.json();
            console.log(data, 'check');
            if (data.status === 200) {

                Cookies.remove('userObject');
                Cookies.set('userObject', JSON.stringify(completeFormData));
                // Handle success
                toast.success("User update successfully");
                console.log('Post created successfully');
                handleClose();
            } else {
                // Handle errors
                console.error('Error creating post:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating post:', error);
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
                    <h1 className=" text-center text-2xl font-semibold">User Profile</h1>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xl font-medium "
                        >
                            Name
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.name}
                            type="text"
                            name="name"
                            id="Name"
                            placeholder="Enter your post Name"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xl font-medium "
                        >
                            Email
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.email}
                            type="text"
                            name="email"
                            id="Name"
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>



                    <div className="mb-2">
                        <label className="  block text-xl font-medium  ">
                            Upload File
                        </label>
                        <div className="mb-2">
                            <input type="file" name="file" id="file" onChange={handleChange} className="sr-only" />
                            <label
                                htmlFor="file"
                                className="relative flex min-h-[170px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center"
                            >
                                <div>
                                    <span className="  block text-xl font-medium  ">
                                        Drop files here
                                    </span>
                                    <span className="  block text-base font-medium text-[#6B7280]">
                                        Or
                                    </span>
                                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                        Browse
                                    </span>
                                </div>
                            </label>
                        </div>
                        {formData.profile && !file && <img className=" size-20" src={formData.profile} />}
                        {file && <img className=" size-20" src={file} />}
                        {error && <p className=" text-red-600">{error}</p>}
                    </div>
                    <div>
                        <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-medium text-white outline-none">
                            {loading ? 'loading..' : `Update Profile`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>;

}

export default UserProfileForm;
