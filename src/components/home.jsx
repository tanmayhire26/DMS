import { Link, NavLink } from "react-router-dom";

function Home() {
	return (
		<div
			className="flex justify-center items-center   h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-yellow-100 via-yellow-200 to-yellow-300"
		>
			<div
				className="h-[95%] w-[80%] bg-center  bg-contain bg-no-repeat"
				style={{ backgroundImage: "url(/homeImage.png)" }}
			>
				<div className=" italic font-bold text-xs flex absolute right-[22%] top-[18%] gap-3">
					<div>
						<NavLink
							style={{ textDecoration: "none" }}
							className={"focus:text-orange-300 text-gray-600"}
							to=""
						>
							ABOUT US
						</NavLink>
					</div>

					<div>
						<NavLink
							style={{ textDecoration: "none" }}
							className={"focus:text-orange-300 text-gray-600"}
							to="/login"
						>
							LOGIN
						</NavLink>
					</div>
				</div>
			</div>
			{/* <img className="w-5/6 z-1" src="homeImage.png" /> */}
		</div>
	);
}

export default Home;
