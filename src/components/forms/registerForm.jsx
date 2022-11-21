import { Form, useNavigate } from "react-router-dom";
import ListOfDepartments from "./listOfDepartments";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { registerUser } from "../../actions/registerAction";
import { Alert } from "@mui/material";
import { loadLogin } from "../../actions/loginAction";

import jwt_decode from "jwt-decode";
import { getAllUsers, updateUser } from "../../actions/userAction";

const schema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().required().email(),
	phone: yup.string().required().min(10).max(10),
	userName: yup.string().required(),
	password: yup.string().required().min(8),
	//role: yup.string(),
	//departments: yup.array(), //objct id here
	// lastLoggedIn: yup.date(),
	// isActive: yup.boolean(),
	// updatedBy: yup.string(),
	// updatedAt: yup.date(),
});

function RegisterForm(props) {
	let selectedDP = [];
	const { userRole, userId } = props;
	const [emailExists, setEmailExists] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadLogin());
		dispatch(getAllUsers());
	}, []);
	let token;
	token = useSelector((state) => state.loginReducer.token);
	let decoded = {};
	if (token) {
		decoded = jwt_decode(token);
	}

	const users = useSelector((state) => state.userReducer.users);
	console.log("in Register Form Token", decoded?._id);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({ resolver: yupResolver(schema) });

	useEffect(() => {
		if (!userId) return;
		const user = users.find((u) => u._id === userId);

		setValue("firstName", user?.firstName);
		setValue("lastName", user?.lastName);
		setValue("email", user?.email);
		setValue("phone", user?.phone);
		setValue("userName", user?.userName);
		setValue("password", user?.password);
		// setValue("departments",)
		setValue("_id", user?._id);
	}, [userId]);

	const handleChange = (value) => {
		selectedDP = value;
		console.log("Array of user departments", selectedDP);
	};
	const onSubmitHandler = (data) => {
		let enteredEmail = data.email;
		let checkEmail = users.find((u) => u.email === enteredEmail);
		if (checkEmail && !data._id) {
			setEmailExists(true);
			return;
		}

		data["departments"] = selectedDP;

		if (decoded.role === "Admin") {
			data["role"] = "Indexer";
			if (data._id) {
				data["updatedBy"] = decoded._id;
				dispatch(updateUser(data));
				navigate("/admin/users");
			} else {
				dispatch(registerUser(data));
				navigate("/admin/users");
			}
		} else {
			data["role"] = "General User";
			if (data._id) {
				data["updatedBy"] = decoded._id;
				dispatch(updateUser(data));
				navigate("/generalUser");
			} else {
				dispatch(registerUser(data));
				navigate("/login");
			}
		}
		reset();
		navigate("/admin");
		navigate("/admin/users");
	};
	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="flex-row justify-center text-orange-600 font-bold shadow-lg p-3 backdrop-blur rounded"
			>
				<div className="flex justify-between">
					<div className="">
						<label htmlFor="fname" className="form-label">
							First Name*
						</label>
						<input
							{...register("firstName")}
							id="fname"
							type="text"
							className="form-control border p-1"
							placeholder="e.g Cersei"
						></input>
						{errors.firstName ? (
							<Alert severity="error">{errors.firstName?.message}</Alert>
						) : null}
					</div>
					<div className="">
						<label htmlFor="lname" className="form-label">
							Last Name*
						</label>
						<input
							id="lname"
							type="text"
							className="form-control border p-1"
							placeholder="e.g Lannister"
							{...register("lastName")}
						></input>
						{errors.lastName ? (
							<Alert severity="error">{errors.lastName?.message}</Alert>
						) : null}
					</div>
				</div>
				<div className="flex justify-around">
					<div className="">
						<label htmlFor="em" className="form-label">
							email*
						</label>
						<input
							id="em"
							type="email"
							className="form-control border p-1"
							placeholder="e.g abc@xyz.com"
							{...register("email")}
						></input>
						{errors.email ? (
							<Alert severity="error">{errors.email?.message}</Alert>
						) : null}
						{emailExists ? (
							<Alert severity="error">
								this email already exists. Please enter another email id
							</Alert>
						) : null}
					</div>
					<div className="">
						<label htmlFor="phno" className="form-label">
							Phone*
						</label>
						<input
							id="phno"
							type="text"
							className="form-control border p-1"
							placeholder="e.g 8888888888"
							{...register("phone")}
						></input>
						{errors.phone ? (
							<Alert severity="error">{errors.phone?.message}</Alert>
						) : null}
					</div>
				</div>

				<div className="">
					<label htmlFor="dep" className="form-label">
						Department(s)
					</label>

					<div className="w-full bg-white text-black font-none">
						<ListOfDepartments
							onHandleChange={handleChange}
							register={register}
						/>
					</div>
				</div>
				<div className="flex justify-around">
					<div className="">
						<label htmlFor="uname" className="form-label">
							Username*
						</label>
						<input
							type="text"
							className="form-control"
							id="uname"
							placeholder="e.g cersei99"
							{...register("userName")}
						/>
						{errors.userName ? (
							<Alert severity="error">{errors.userName?.message}</Alert>
						) : null}
					</div>
					<div className="">
						<label htmlFor="upass" className="form-label">
							Password*
						</label>
						<input
							type="password"
							className="form-control"
							id="upass"
							placeholder="e.g ***********"
							{...register("password")}
						/>
						{errors.password ? (
							<Alert severity="error">{errors.password?.message}</Alert>
						) : null}
					</div>
				</div>
				<button
					className="mt-4 text-white p-2 w-full rounded bg-orange-400"
					type="submit"
				>
					Sign up
				</button>
			</Form>
		</>
	);
}

export default RegisterForm;
