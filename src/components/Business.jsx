import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBusiness } from '../hooks/useFetchData';
import { User } from 'lucide-react';
import { api } from '../libs/serverChecking';

const Business = () => {
	const router = useParams();
	console.log(router);
	const posts = useBusiness(`${api.config}business`);
	const businessPost = useBusiness(`${api.config}business`);
	console.log(businessPost, 'post');

	const [currentBusinessIndex, setCurrentBusinessIndex] = useState(0);

	const [shortDes, setShortDes] = useState(true);



	useEffect(() => {
		if (businessPost.length > 0) {
			const intervalId = setInterval(() => {
				setCurrentBusinessIndex((prevIndex) => (prevIndex + 1) % businessPost.length);
			}, 10000); // 10 seconds interval

			return () => clearInterval(intervalId); // Cleanup interval on component unmount
		}
	}, [businessPost.length]);

	return (
		<div className='md:px-12 p-4 max-w-screen-2xl mx-auto'>
			<div className="section pt-1">
				<div className="container z-0">
					<div className="flex  justify-center">
						<div className="col-sm-12 col-md-8 blog-main">
							<div className="blog-post">
								<h1 className='text-lg my-1'>Business</h1>
								<div className='mt-3'>
									{posts?.map((post, idx) => (
										<div key={post._id} className='border-2 rounded-md p-3 mb-10 border-black/20'>
											<div className="blog-post-meta">
												<img src={post.logoOrProductImages} alt='' className='z-0 h-[200px] w-full object-cover shadow-sm' />
												<p className='blog-post-title text-lg font-bold py-2 pt-3'>{`${post.productsOrServices}`}</p>
												<h3 className={`max-w-2xl mt-2  ${shortDes ? ' line-clamp-3' : ''}`}>{post.description}</h3>
											</div>
											<div className='flex items-center gap-1'>
												<button className='px-1 md:px-3 py-1 mb-10 rounded-md mt-2 text-[10px] border-2 border-black/20' onClick={() => setShortDes(!shortDes)}>Read more</button>

												<a href='#' className='px-1 md:px-3 py-1 mb-10 rounded-md mt-2 text-xs border-2 border-black/20'>Join Campaign</a>
											</div>
											<p className='flex items-center'><User className='size-5 gap-2' /><span className='font-bold'>{`Owned By  ~ ${post.owner}`}</span></p>
										</div>
									))}

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
			</div>
		</div>
	);
};

export default Business;