import React from "react";
import Header from "../Components/Header";
import SideBar from "../Components/SideBar";
function DeshboardLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="lg:flex gap-10">
                <SideBar />
                <main className="flex-1 mt-4 p-4 md:p-8">{children}</main>
            </div>
        </div>
    );

}

export default DeshboardLayout;
