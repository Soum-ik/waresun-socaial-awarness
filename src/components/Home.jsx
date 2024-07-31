import React from 'react';
import Picture from '../assets/picture.png';

import { useBusiness } from '../hooks/useFetchData';

import { User } from 'lucide-react';
import { api } from '../libs/serverChecking';


const Home = () => {

	// const postss = useBusiness(`https://social-awareness-backend.vercel.app//get-post`);
	const posts = useBusiness(`${api.config}get-post`);
	// const posts = useBusiness('http://localhost:4000/get-post');
	console.log(posts, "posts data");



	return (
		<div className='md:px-12 p-4 max-w-screen-2xl mx-auto'>
			{<div className="section">
				<div className="container z-0">
					<div className=" flex items-centere justify-center">
						<div className="col-sm-12 col-md-8 blog-main">
							<div className="blog-post">
								<h1 className='text-lg my-1'>Campaign</h1>
								<div className=' mt-3'>

									{
										posts?.map((post, idx) => (
											<div className=' border-2 rounded-md p-3 mb-10 border-black/20'>
												<div key={idx} className="blog-post-meta ">
													<h3 className="blog-post-title text-lg font-bold py-4 ">{post.title}</h3>
													<img src={post.image} alt='' className='  z-0 h-auto max-w-full shadow-sm' />
													<p className=' gap mt-1  '>{`  Publish Date - ${post.startDate}`}</p>
													<p className=' mt-1  font-bold'>{` Cetagory  - ${post.goals}`}</p>

												</div>
												<div>
													{post.des}
												</div>
												<div className=' flex items-center gap-3 mt-2'>

													<button className=' px-3 py-1 mb-10 rounded-md  mt-2 text-xs border-2 border-black/20'>Read more</button>
													<button className=' px-3 py-1 mb-10 rounded-md  mt-2 text-xs border-2 border-black/20'>Share on Socaial media</button>
													<button className=' px-3 py-1 mb-10 rounded-md  mt-2 text-xs border-2 border-black/20'>Join Campain</button>
												</div>
												<p className='  flex items-center '><User className=' size-5 gap-2' /><span className=' font-bold'>{`Owned By  ~ ${post.name} `}</span></p>

											</div>
										))
									}
									{posts.length === 0 && <p>There is no avaiable now!</p>}
								</div>

							</div>
						</div>
						<div className="col-sm-12  col-md-4 col-lg-3 blog-sidebar">
							<h1 className='text-lg my-1'>Advertising</h1>
							<div className=" mt-3	 sidebar-module">
								<center><img src={Picture} /></center>
							</div>
						</div>
					</div>
				</div>
			</div>
			}

		</div>
	);
};

export default Home;