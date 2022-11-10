import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "postcss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../../actions/loginAction";
import jwt_decode from "jwt-decode";
import { Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
const schema = yup.object().shape({
	userName: yup.string().required(),
	password: yup.string().min(5).max(35).required(),
});
function LoginForm(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { handleClick } = props;
	let [progress, setProgress] = useState(false);
	// const token = "";
	// let decoded = {};

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
		handleClick();
		handleClickProgress();

		return setTimeout(() => navigate("/"), 1500);

		// decoded.role === "Admin"
		// 	? navigate("/admin")
		// 	: decoded.role === "Indexer"
		// 	? navigate("/indexer")
		// 	: navigate("/generalUser");
	};
	const handleClickProgress = () => {
		setProgress(true);
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
						<div className="absolute left-[40%] z-2">
							{progress === true ? <CircularProgress /> : null}
						</div>
						LOGIN
					</button>
				</Form>
				<div className="mt-1 flex text-xs justify-between">
					<div className="font-bold">
						<Link to="/register">Create Account</Link>
					</div>
					<div>
						<NavLink to="/forgotPassword">Forgot Password ?</NavLink>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginForm;
