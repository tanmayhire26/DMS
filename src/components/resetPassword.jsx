import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { changePassword } from "../actions/userAction";

export function resetLoader({ params }) {
	const userId = params.id;
	return userId;
}

export function ResetPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useLoaderData();

	const { register, handleSubmit } = useForm();

	const onSubmitHandler = (data) => {
		dispatch(changePassword(data.password, userId));
		navigate("/login");
	};

	return (
		<>
			<div
				className="h-screen flex justify-center items-center bg-cover bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-white via-purple-200 to-red-300"
			>
				<Form
					onSubmit={handleSubmit(onSubmitHandler)}
					className="form w-2/6 shadow p-2"
				>
					<label htmlFor="npass" className="form-label">
						Enter new Password
					</label>
					<input
						type="password"
						id="npass"
						className="form-control"
						{...register("password")}
					/>
					<button
						type="submit"
						className="mt-2 p-1 w-full text-white bg-orange-400 font-bold rounded-full"
					>
						Change Password
					</button>
				</Form>
			</div>
		</>
	);
}
