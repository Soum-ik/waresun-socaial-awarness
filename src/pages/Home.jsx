import React from "react";
import Navbar from "../layout/Navbar";
import Home from '../components/Home';
import { Toaster } from "react-hot-toast";

function HomePage() {
    return <div>
        <Navbar />
        <Home />
        <Toaster position='top-right' />
    </div>;
}

export default HomePage;
