import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLogin } from "../actions/loginAction";
import { getAllUsers } from "../actions/userAction";
import RegisterForm from "./forms/registerForm";

function Register(props) {
	const dispatch = useDispatch();
	const { userId, userRole } = props;

	useEffect(() => {
		dispatch(loadLogin());
		dispatch(getAllUsers());
	}, []);
	return (
		<>
			<div
				className="flex justify-center items-center bg-cover bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-yellow-100 via-yellow-200 to-yellow-300"
			>
				<div
					className="flex justify-center items-center w-screen h-screen bg-center bg-contain bg-no-repeat"
					style={{ backgroundImage: "url(/homeImage.png)" }}
				>
					<RegisterForm userId={userId} userRole={userRole} />
				</div>
			</div>
		</>
	);
}

export default Register;
