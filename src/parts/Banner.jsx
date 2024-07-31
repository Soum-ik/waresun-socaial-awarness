import React from 'react';
const Banner = ({banner, heading, subheading, btn1, btn2}) => {
    return (
        <div className='rounded-lg rounded-br[80px] md:p-9 px-4 py-9'>
        <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-10'>
            <div>
                <img src={banner} alt='' className='lg:h-[386]' />   
            </div>
            <div className='md:w-3/5'>
             <h3 className='md:text-7xl text-4xl font-bold text-black mb-6 leading-relaxed'>{heading}</h3>
             <p className='text-[#364263] text-2xl mb-8'>
             {subheading}
             </p>
             <div className='space-x-5 space-y-4'>
             <button className='btnPrimary'>{btn1}</button>
             <button className='btnPrimary'>{btn2}</button>
             </div>
            </div>
        </div>
        </div>
    );
};

export default Banner;