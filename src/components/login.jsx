import { NavLink } from "react-router-dom";
import LoginForm from "./forms/loginForm";





function Login() {
	return (
		<>
			
				<div
					className="flex justify-center   h-full bg-cover bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-yellow-100 via-yellow-200 to-yellow-300"
				>
					<div
						className="h-screen w-screen bg-center bg-no-repeat"
						style={{ backgroundImage: "url(/loginBg.png)" }}
					>
						<div className=" italic font-bold text-xs flex absolute right-[22%] top-[12%] gap-3">
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

						<div className="flex-row absolute right-[22%] bottom-[13%] shadow rounded h-[68%] w-[24%] bg-white">
							<img className="w-full h-3/6" src="loginImage.png" />
							<div className="flex mx-5 mt-4">
								<LoginForm />
							</div>
						</div>
					</div>
				</div>
			
		</>
	);
}

export default Login;
