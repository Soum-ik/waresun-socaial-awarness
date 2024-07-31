// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import { IoMenuSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Deshboard from "../components/Deshboard";
const Navbar = () => {
    const [showModalLogin, setshowModalLogin] = useState(false);
    const [showModaRegistration, setshowModaRegistration] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const token = Cookies.get('authToken');
    console.log(token, "authtoken");



    const navItems = [
        { link: "Home", path: "/" },
        { link: "Campaigns", path: "campaigns" },
        { link: "Business", path: "business" },
    ];

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [isRequired, setIsRequired] = useState(true);

    const [successRegistration, setSuccessRegistration] = useState('');
    const [successLogin, setSuccessLogin] = useState('');

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (newValue !== '') {
            setIsRequired(false);
        } else {
            setIsRequired(true);
        }
    };

    const [user, setUser] = useState({});

    const Registration = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setSuccessRegistration('Password do not match ?');
        } else {
            try {
                const response = await fetch('http://localhost:4000/registration', {
                    method: 'post',
                    body: JSON.stringify({ name, email, password }),
                    headers: { 'Content-type': 'application/json' }
                });
                if (response.ok) {
                    setSuccessRegistration('Save successfully');
                } else {
                    setSuccessRegistration('Email already used ?');
                }
            } catch (error) {
                setSuccessRegistration('Error submitting form?');
            }
        }
    };

    const Login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const body = await response.json();
            // console.log(body,  'bodu');
            const token = body.token;
            if (body.mess === "success") {
                setUser(body);
                setSuccessLogin('Login successfully');
                const { data, user } = body;
                const userDeatils = JSON.stringify(user);
                document.cookie = `authToken=${token}; max-age=3600; path=/;`;
                document.cookie = `userInfo=${data}; max-age=3600; path=/;`;
                document.cookie = `userObject=${userDeatils}; max-age=3600; path=/;`;
                setshowModaRegistration(false);
                setshowModalLogin(false);
                window.location.reload();

            }
            else {
                setSuccessLogin('Email or password not match');
            }
        } catch (error) {
            setSuccessLogin('Error server problem');
        }

    };

    return (
        <>
            <nav className='bg-white md:px-14 p-4 max-w-screen-2xl mx-auto text-primary'>
                <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
                    <div className='flex space-x-14 items-center'>
                        <a href="/" className='text-2xl flex items-center space-x-3'><img className='w-150 inline-block item-center' src={logo} alt='' /></a>
                        <ul className='md:flex space-x-12 hidden z-40  '>
                            {
                                navItems.map(({ link, path }) => <a key={link} href={path} className='block text-base hover:text-gray-300 z-[1000px] '>{link}</a>)
                            }
                        </ul>
                    </div>
                    {token ? <Deshboard data={user} /> : <div className='space-x-12 hidden md:flex items-center text-base'>
                        <a href='#login' className='hidden lg:flex  items-center hover:text-gray-300' onClick={() => setshowModalLogin(true)}><FaCircleUser /> <span className='px-1'>Login</span></a>
                        <a href='#registration' onClick={() => setshowModaRegistration(true)}><button className='text-white py-2 px-5 transition-all duration-300 rounded hover:text-[#eee]  bg-indigo-600'>Registration</button></a>
                    </div>}
                    <div className='md:hidden '>
                        <button onClick={toggleMenu} className='text-black focus:outline-none focus:text-gray-300 z-50'>
                            {isMenuOpen ? (<FaXmark className='w-6 h-6 text-primary' />) : (<IoMenuSharp className='w-6 h-6 text-primary' />)}
                        </button>
                    </div>
                </div>
            </nav>
            <div className={`bg-[#eee] space-y-4 px-4 pt-6 pb-5 ${isMenuOpen ? "block fixed top-15 right-4 left-4" : "hidden"}`}>
                {
                    navItems.map(({ link, path }) => <a key={link} href={path} className='block hover:text-gray-300'>{link}</a>)
                }
            </div>
            {showModalLogin ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/60">
                        <div class="relative w-full max-w-md px-4 h-full md:h-auto">
                            <div class="bg-white rounded-lg shadow relative dark:bg-gray-700">
                                <div class="flex justify-end p-2">
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setshowModalLogin(false)}>
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <form onSubmit={Login} class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="#">
                                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">Login in to our platform</h3>
                                    <div class="p-2 mb-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                        {successLogin}
                                    </div>
                                    <div>
                                        <label for="email" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="{isRequired}" />
                                    </div>
                                    <div>
                                        <label for="newpassword" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">New password</label>
                                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="{isRequired}" />
                                    </div>
                                    <div class="flex justify-between">
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                                            </div>
                                            <div class="text-sm ml-3">
                                                <label for="remember" class="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                                            </div>
                                        </div>
                                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password ?</a>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Now</button>
                                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                                        Not registered ? <a href='#registration' onClick={() => setshowModaRegistration(true) & setshowModalLogin(false)} class="text-blue-700 hover:underline dark:text-blue-500">Registration</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
            {showModaRegistration ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div class="relative w-full max-w-md px-4 h-full md:h-auto">
                            <div class="bg-white rounded-lg shadow relative dark:bg-gray-700">
                                <div class="flex justify-end p-2">
                                    <button type="button" class=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setshowModaRegistration(false)}>
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>
                                <form onSubmit={Registration} class="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="#">
                                    <h3 class="text-xl font-medium text-gray-900 dark:text-white">SignUp in to our platform</h3>
                                    <div class="p-2 mb-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                                        {successRegistration}
                                    </div>
                                    <div>
                                        <label for="name" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your name</label>
                                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="{isRequired}" />
                                    </div>
                                    <div>
                                        <label for="email" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email</label>
                                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="{isRequired}" />
                                    </div>
                                    <div>
                                        <label for="newpassword" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">New password</label>
                                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="{isRequired}" />
                                    </div>
                                    <div>
                                        <label for="confirmpassword" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Confirm password</label>
                                        <input type="password" id="confirmpassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="{isRequired}" />
                                    </div>
                                    <div class="flex justify-between">
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="{isRequired}" />
                                            </div>
                                            <div class="text-sm ml-3">
                                                <label for="remember" class="font-medium text-gray-900 dark:text-gray-300">Trams & condition</label>
                                            </div>
                                        </div>
                                        <a href="#" class="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password ?</a>
                                    </div>
                                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit Now</button>
                                    <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                                        Not registered ? <a href="#login" onClick={() => setshowModalLogin(true) & setshowModaRegistration(false)} class="text-blue-700 hover:underline dark:text-blue-500">Login</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            ) : <></>}
        </>


    );
};

export default Navbar;