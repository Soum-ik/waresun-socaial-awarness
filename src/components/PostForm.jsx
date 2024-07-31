import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import useImageUpload from "../hooks/useImageUpload";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../libs/serverChecking";

function PostForm({ close }) {
    const token = Cookies.get('authToken');
    const UserName = Cookies.get('userInfo');
    // inital state
    const [formData, setFormData] = useState({
        title: '',
        des: '',
        startDate: '',
        endDate: '',
        goals: ""
    });

    console.log(formData.goals);

    // token, name, title, des, image

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

        if (!formData.title || !formData.des) {
            alert('Fill the form first');
            return;
        }

        try {
            const completeFormData = {
                ...formData,
                image: file,
                token,
                name: UserName,

            };

            console.log(completeFormData, 'complete form');

            // Example POST request to your server
            const response = await fetch(`${api.config}create-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completeFormData),
            });

            if (response.status === 200) {
                // Handle success
                toast.success("Post created successfully");
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
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xl font-semibold "
                        >
                            Post Title
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.title}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter your post title"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xl font-semibold "
                        >
                            Post Description
                        </label>
                        <textarea
                            name="des"
                            value={formData.des}
                            onChange={handleFormState}
                            rows={5}
                            cols={2}
                            id="des"
                            placeholder="Enter your post description"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className=" flex gap-2">
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="mb-1 block text-xl font-semibold "
                            >
                                Start Date
                            </label>
                            <input
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleFormState}
                                id="startDate"
                                placeholder="Enter your Start Date"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="mb-1 block text-xl font-semibold "
                            >
                                End Date
                            </label>
                            <input
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleFormState}
                                id="endDate"
                                placeholder="Enter your End Date"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="mb-1 block text-xl font-semibold "
                        >
                            Cetagory type
                        </label>
                        <input
                            name="goals"
                            type="text"
                            value={formData.goals}
                            onChange={handleFormState}
                            id="goals"
                            placeholder="Enter your Cetagory type"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="  block text-xl font-semibold  ">
                            Upload File
                        </label>
                        <div className="mb-2">
                            <input type="file" name="file" id="file" onChange={handleChange} className="sr-only" />
                            <label
                                htmlFor="file"
                                className="relative flex min-h-[170px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center"
                            >
                                <div>
                                    <span className="  block text-xl font-semibold  ">
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
                        {file && <img className=" size-20" src={file} />}
                        {error && <p className=" text-red-600">{error}</p>}
                    </div>
                    <div>
                        <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            {loading ? 'loading..' : `Send File`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>;

}

export default PostForm;
