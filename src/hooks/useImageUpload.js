import { useState } from "react";

const useImageUpload = (apiKey) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleChange = async (e) => {
        const selectedFile = e.target.files[0];
        const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

        const formData = new FormData();
        formData.append("image", selectedFile);
        setLoading(true);
        try {
            const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setFile(data.data.url);
                setError(null);
                setLoading(false);

            } else {
                setLoading(false);
                setError("Failed to upload image");
            }
        } catch (error) {
            setLoading(false);
            setError("Error uploading image: " + error.message);
        }
    };

    return { file, error, handleChange, loading };
};

export default useImageUpload;
