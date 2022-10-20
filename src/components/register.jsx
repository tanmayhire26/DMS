import RegisterForm from "./forms/registerForm";

function Register() {
    return (
			<>
				<div
					className="flex justify-center items-center bg-cover bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-yellow-100 via-yellow-200 to-yellow-300"
				>
					<div
						className="flex justify-center items-center w-screen h-screen bg-center bg-contain bg-no-repeat"
						style={{ backgroundImage: "url(/homeImage.png)" }}
					><RegisterForm/></div>
				</div>
			</>
		);
}

export default Register;