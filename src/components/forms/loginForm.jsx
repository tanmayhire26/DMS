import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "postcss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../../actions/loginAction";
import jwt_decode from "jwt-decode";
import { Alert } from "@mui/material";
const schema = yup.object().shape({
	userName: yup.string().required(),
	password: yup.string().min(5).max(35).required(),
});
function LoginForm(getState) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = "";
	let decoded = {};

	// token = useSelector((state) => state.loginReducer.token);
	// decoded = jwt_decode(token);
	// console.log(
	// 	decoded.role,
	// 	"   in the login form role of logged in poerson is"
	// );

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmitHandler = (data) => {
		console.log("in on submit handler data sent is", data);
		dispatch(loginUser(data));

		navigate("/");

		// decoded.role === "Admin"
		// 	? navigate("/admin")
		// 	: decoded.role === "Indexer"
		// 	? navigate("/indexer")
		// 	: navigate("/generalUser");
	};

	return (
		<>
			<div className="flex-row">
				<Form
					className="w-full flex-row"
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<input
						className="w-full mt-2 p-2 border rounded-full"
						placeholder="Username"
						type="text"
						{...register("userName")}
					/>
					<input
						className="w-full border rounded-full mt-2 p-2"
						placeholder="Password"
						type="password"
						{...register("password")}
					/>
					<button
						type="submit"
						className=" p-2 mt-2  w-full rounded-full bg-orange-300"
					>
						LOGIN
					</button>
				</Form>
				<div className="mt-1 flex text-xs justify-between">
					<div className="font-bold">
						<Link to="/register">Create Account</Link>
					</div>
					<div>Forgot Password ?</div>
				</div>
			</div>
		</>
	);
}

export default LoginForm;
