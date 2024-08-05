import React from 'react';
import logo from '../assets/logo.png';
const Footer = () => {
    return (
        <div className='md:px-14 p-4 max-w-screen-2xl mx-auto'>
            <div className='my-12 flex flex-col md:flex-row gap-10'>
              <div className='md:w-1/2 space-y-8'>
              <a href="" className='text-2xl flex items-center space-x-3'><img className='w-150 inline-block item-center' src={logo} alt=''/></a>
              <p className='md:w-1/2'>Social Awareness. Social Awareness: The ability to take the perspective of and empathize with others, including those from diverse backgrounds and cultures.</p>
              </div>
              <div className='md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start'>
              <div className='space-y-6 mt-5'>
                <h4 className='text-xl'>Platform</h4>
                <ul className='space-y-3'>
                    <a href='/' className='block hover:text-gray-300'>Overview</a>
                    <a href='/' className='block hover:text-gray-300'>Fuetures</a>
                    <a href='/' className='block hover:text-gray-300'>About</a>
                </ul>
              </div>
              <div className='space-y-4 mt-5'>
                <h4 className='text-xl'>Help</h4>
                <ul className='space-y-3'>
                    <a href='/' className='block hover:text-gray-300'>How does it works?</a>
                    <a href='/' className='block hover:text-gray-300'>Where do ask question?</a>
                    <a href='/' className='block hover:text-gray-300'>How to play?</a>
                    <a href='/' className='block hover:text-gray-300'>What is need for this?</a>
                </ul>
              </div>
              <div className='space-y-4 mt-5'>
                <h4 className='text-xl'>Contact</h4>
                <ul className='space-y-3'>
                    <a className='block hover:text-gray-300'>017-000-00000</a>
                    <a className='block hover:text-gray-300'>xyz</a>
                    <a className='block hover:text-gray-300'>Dhaka, Bangladesh</a>
                    <a className='block hover:text-gray-300'>4582222</a>
                </ul>
              </div>
              </div>
            </div>
          
        </div>
    );
};

export default Footer;