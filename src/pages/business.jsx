import React from "react";
import Navbar from "../layout/Navbar";
import Business from '../components/Business';
import { Toaster } from "react-hot-toast";

function BusinessPage() {
    return <div>
        <Navbar />
        <Business />
     
        <Toaster position='top-right' />
    </div>;
}

export default BusinessPage;
