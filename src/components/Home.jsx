import React, { useState, useEffect } from 'react';
import Picture from '../assets/picture.png';
import { useBusiness } from '../hooks/useFetchData';
import { User } from 'lucide-react';
import { api } from '../libs/serverChecking';
import iamge1 from "../../public/code.jpg";
import { Link } from 'react-router-dom';

const Home = () => {
	const posts = useBusiness(`${api.config}get-post`);
	console.log(posts, "posts data");

	const businessPost = useBusiness(`${api.config}business`);
	console.log(businessPost, 'post');

	const [currentBusinessIndex, setCurrentBusinessIndex] = useState(0);

	useEffect(() => {
		if (businessPost.length > 0) {
			const intervalId = setInterval(() => {
				setCurrentBusinessIndex((prevIndex) => (prevIndex + 1) % businessPost.length);
			}, 10000); // 10 seconds interval

			return () => clearInterval(intervalId); // Cleanup interval on component unmount
		}
	}, [businessPost.length]);
	const [shortDes, setShortDes] = useState(true);

	return (
		<div className='md:px-12 p-4 max-w-screen-2xl mx-auto'>
			{<div className="section pt-1">
				<div className="container z-0">
					<div className=" flex items-centere justify-center">
						<div className="col-sm-12 col-md-8 blog-main">
							<div className="blog-post">
								<h1 className='text-lg my-1'>Campaign</h1>
								<div className=' mt-3'>
									{
										posts?.map((post, idx) => (
											<div key={idx} className='border-2 rounded-md p-3 mb-10 border-black/20'>
												<div className="blog-post-meta">
													<h3 className="blog-post-title text-lg font-bold py-2">{post.title}</h3>
													<img src={post.image} alt='' className='z-0 h-[200px] w-full object-cover shadow-sm' />
													<p className='py-2'>{`Publish Date - ${post.startDate}`}</p>
													<p className='mt-1 font-bold'>{`Category - ${post.goals}`}</p>
												</div>

												<h3 className={` mt-2  ${shortDes ? ' line-clamp-3' : ''}`}>{post.des}</h3>

												<div className='flex items-center gap-3 mt-2'>
													<button className='px-1 md:px-3 py-1 mb-10 rounded-md mt-2 text-[10px] border-2 border-black/20' onClick={() => setShortDes(!shortDes)}>Read more</button>
													{/* <button className='px-1 md:px-3 py-1 mb-10 rounded-md mt-2 text-[10px] border-2 border-black/20'>Share on Social media</button> */}
													<button className='px-1 md:px-3 py-1 mb-10 rounded-md mt-2 text-[10px] border-2 border-black/20'>Join Campaign</button>
												</div>
												<p className='flex items-center'><User className='size-5 gap-2' /><span className='font-bold'>{`Owned By ~ ${post.name}`}</span></p>
											</div>
										))
									}
									{posts.length === 0 && <p>There is no available now!</p>}
								</div>
							</div>
						</div>
						<div className="col-sm-12 hidden md:block col-md-4 col-lg-3 blog-sidebar">
							<h1 className='text-lg my-1'>Advertising</h1>
							{businessPost.length > 0 && (
								<div key={businessPost[currentBusinessIndex]._id} className="mt-3 sidebar-module">
									<center>
										<Link to={'/business'}>
											<img src={businessPost[currentBusinessIndex].logoOrProductImages} alt="Business Post" />
										</Link>
									</center>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>}
		</div>
	);
};

export default Home;
