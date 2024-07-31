import React from 'react';
import Picture from '../assets/picture.png';

import { useParams } from 'react-router-dom';
import { useBusiness } from '../hooks/useFetchData';
import { User } from 'lucide-react';
import { api } from '../libs/serverChecking';


const Business = () => {

	const router = useParams();
	console.log(router);
	const posts = useBusiness(`${api.config}business`);


	return (
		<div className='md:px-12 p-4 max-w-screen-2xl mx-auto'>
			{<div className="section">
				<div className="container z-0">
					<div className=" flex items-centere justify-center">
						<div className="col-sm-12 col-md-8 blog-main">
							<div className="blog-post">
								<h1 className='text-lg my-1'>Business</h1>
								<div className=' mt-3'>

									{
										posts?.map((post, idx) => (
											<div className=' border-2 rounded-md p-3 mb-10 border-black/20'>
												<div key={idx} className="blog-post-meta ">
													<img src={post.logoOrProductImages} alt='' className='  z-0 h-auto max-w-full shadow-sm' />
													<p className='blog-post-title text-lg font-bold py-2 pt-3 '>{`${post.productsOrServices} `}</p>
													<h3 className="   max-w-2xl mt-2">{post.description}</h3>
													{/* <p className=' pt-2 flex items-center '><User className=' size-5 gap-2'/><span className=' font-bold'>{`Owned By  ~ ${post.owner} `}</span></p> */}
												</div>
												<div className=' flex items-center gap-1'>

													<a href='#' className=' px-3 py-1 mb-10 rounded-md  mt-2 text-xs border-2 border-black/20'>Read more</a>
													<a href='#' className=' px-3 py-1 mb-10 rounded-md  mt-2 text-xs border-2 border-black/20'>Share on Socaial media</a>
													<a href='#' className=' px-3 py-1 mb-10 rounded-md  mt-2 text-xs border-2 border-black/20'>Join Campain</a>
												</div>
												<p className='  flex items-center '><User className=' size-5 gap-2' /><span className=' font-bold'>{`Owned By  ~ ${post.owner} `}</span></p>


											</div>
										))
									}
									{posts.length === 0 && <p>There is no avaiable now!</p>}
								</div>

							</div>
						</div>
						<div className="col-sm-12  col-md-4 col-lg-3 blog-sidebar">
							<h1 className='text-lg my-1'>Advertising</h1>
							<div className="mt-3 sidebar-module">
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

export default Business;