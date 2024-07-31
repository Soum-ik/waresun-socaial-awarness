import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import Cookies from 'js-cookie';
import useImageUpload from "../hooks/useImageUpload";
import toast from "react-hot-toast";

function BusinessListTable({ close }) {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        owner: '',
        description: '',
        productsOrServices: '',
        logoOrProductImages: ''
    });
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const token = Cookies.get('authToken');

    const handleClose = () => {
        close();
    };

    useEffect(() => {
        const fetching = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/business-promotion/${token}`);
                const data = await response.json();
                setPosts(data.data);
                setFetchError(null);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setFetchError('Error fetching posts');
            } finally {
                setLoading(false);
            }
        };
        fetching();
    }, [token]);

    const handleEditClick = (post) => {
        setEditingPost(post);
        setEditFormData({
            name: post.name,
            owner: post.owner,
            description: post.description,
            productsOrServices: post.productsOrServices,
            logoOrProductImages: post.logoOrProductImages
        });
    };

    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:4000/update-business-promotion/${editingPost._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editFormData)
            });
            console.log(response, "checkking response");
            if (response.ok) {
                const updatedPost = await response.json();
                setPosts(posts.map(post => (post._id === updatedPost.data._id ? updatedPost.data : post)));
                setEditingPost(null);
                toast.success('Business updated successfully');
            } else {
                console.error('Failed to update Business');
                toast.error('Failed to update Business');
            }
        } catch (error) {
            console.error('Error updating Business:', error);
            toast.error('Error updating Business');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/delete-business-promotion/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Business deleted successfully');
                setPosts(posts.filter(post => post._id !== id));
            } else {
                toast.error('Failed to delete Business');
            }
        } catch (error) {
            console.error('Error deleting Business:', error);
            toast.error('Failed to delete Business');
        }
    };

    const apiKey = "7a4a20aea9e7d64e24c6e75b2972ff00";
    const { file, error, handleChange } = useImageUpload(apiKey);

    useEffect(() => {
        if (file) {
            setEditFormData({
                ...editFormData,
                logoOrProductImages: file
            });
        }
    }, [file]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="mx-auto max-w-3xl relative z-50 text-black w-full rounded-lg shadow-xl bg-white">
                <CgClose onClick={handleClose} className="absolute mt-2 right-4 mb-3 bg-slate-100 size-8 rounded-xl p-1 cursor-pointer" />
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <p>Loading...</p>
                    </div>
                ) : fetchError ? (
                    <div className="flex items-center justify-center h-full">
                        <p>{fetchError}</p>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
                        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Business Logo</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Business Name</th>
                                    
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Owner</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Products/Services</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                {posts.map((post, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-3 py-4"><img className="w-40 mb-2" src={post.logoOrProductImages} alt="Uploaded File" /></td>
                                        <td className="px-3 py-4">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                {post.name}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 ">{post.owner}</td>
                                        <td className="px-3 py-4 line-clamp-3">{post.description}</td>
                                        <td className="px-3 py-4">{post.productsOrServices}</td>
                                        <td className="px-3 py-4">
                                            <div className="flex justify-end gap-4">
                                                <button onClick={() => handleEditClick(post)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleDelete(post._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {editingPost && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
                            <input
                                type="text"
                                name="name"
                                value={editFormData.name}
                                onChange={handleEditChange}
                                placeholder="Business Name"
                                className="border rounded-md px-3 py-2 mb-2 w-full"
                            />
                            <input
                                type="text"
                                name="owner"
                                value={editFormData.owner}
                                onChange={handleEditChange}
                                placeholder="Owner"
                                className="border rounded-md px-3 py-2 mb-2 w-full"
                            />
                            <textarea
                                name="description"
                                value={editFormData.description}
                                onChange={handleEditChange}
                                placeholder="Description"
                                className="border rounded-md px-3 py-2 mb-2 w-full"
                            />
                            <input
                                type="text"
                                name="productsOrServices"
                                value={editFormData.productsOrServices}
                                onChange={handleEditChange}
                                placeholder="Products/Services"
                                className="border rounded-md px-3 py-2 mb-2 w-full"
                            />
                            <div className="mb-2">
                                <label className="block text-xl font-semibold">Upload File</label>
                                <div className="mb-2">
                                    <input type="file" name="file" id="file" onChange={handleChange} className="sr-only" />
                                    <label htmlFor="file" className="relative flex min-h-[170px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-6 text-center">
                                        <div>
                                            <span className="block text-xl font-semibold">Drop files here</span>
                                            <span className="block text-base font-medium text-[#6B7280]">Or</span>
                                            <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse</span>
                                        </div>
                                    </label>
                                </div>
                                {editFormData.logoOrProductImages && <img className="w-20 mb-2" src={editFormData.logoOrProductImages} alt="Uploaded File" />}
                                {error && <p className="text-red-600">{error}</p>}
                            </div>
                            <div className="flex justify-end">
                                <button onClick={handleEditSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
                                <button onClick={() => setEditingPost(null)} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BusinessListTable;
