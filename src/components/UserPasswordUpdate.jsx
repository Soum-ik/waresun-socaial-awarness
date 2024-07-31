import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function PasswordUpdateForm({ close }) {
    const token = Cookies.get('authToken');


    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({

        newPassword: "",
        confirmPassword: "",
    });

    // Handle state
    const handleFormState = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Close modal
    const handleClose = () => {
        close();
    };

    // Handle form submission
    const handleForm = async (e) => {
        e.preventDefault();

        const { newPassword, confirmPassword } = formData;

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:4000/update-user/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ password: newPassword }),
            });

            const data = await response.json();
            console.log(data, "user data");

            if (response.ok) {
                toast.success("Password updated successfully");
                handleClose();
            } else {
                console.error('Error updating password:', data.message);
                toast.error(data.message || 'Error updating password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Error updating password');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center p-12">
            <div className="mx-auto relative text-black w-full max-w-[550px] rounded-lg shadow-xl bg-white">
                <CgClose onClick={handleClose} className="absolute mt-3 right-4 mb-3 bg-slate-100 size-6 rounded-xl p-1" />

                <form className="py-3 px-4 max-h-[80vh] overflow-y-scroll" onSubmit={handleForm}>
                    <h1 className="text-center text-2xl font-semibold">Update Password</h1>


                    <div className="mb-2">
                        <label htmlFor="newPassword" className="mb-1 block text-xl font-medium">
                            New Password
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.newPassword}
                            type="text"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter your new password"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="mb-1 block text-xl font-medium">
                            Confirm New Password
                        </label>
                        <input
                            onChange={handleFormState}
                            value={formData.confirmPassword}
                            type="text"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm your new password"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div>
                        <button type="submit" className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-medium text-white outline-none">
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PasswordUpdateForm;
