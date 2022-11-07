import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import RegisterForm from "./registerForm";
import jwt_decode from "jwt-decode";
import Register from "../register";
import { Alert } from "@mui/material";

export function userLoader({ params }) {
	const userId = params.id;
	const userRole = params.role;
	return [userId, userRole];
}

export function UserForm() {
	const userId = useLoaderData()[0];
	const userRole = useLoaderData()[1];

	const token = useSelector((state) => state.loginReducer.token);
	const decoded = jwt_decode(token);

	// if (userRole === "Indexer") {
	// 	return <RegisterForm userId={userId} userRole={userRole} />;
	// } else if (userRole === "General User" && decoded?.role === "General User") {
	// 	return <RegisterForm userId={userId} userRole={userRole} />;
	// } else {
	// 	return <h2>Admin cannot edit general user</h2>;
	// }

	if (userRole === "Indexer") {
		return <Register userId={userId} userRole={userRole} />;
	} else if (userRole === "General User" && decoded?.role === "General User") {
		return <Register userId={userId} userRole={userRole} />;
	} else {
		return (
			<div className="flex justify-center items-center">
				<Alert severity="info">Admin cannot edit General User!</Alert>
			</div>
		);
	}
	/* {userRole === "Indexer" ? (
				<RegisterForm userId={userId} userRole={userRole} />
			) : (userRole==="General User"&& decoded?.role==="General User"?<RegisterForm userId={userId} userRole={userRole} />):(
				<h2>ADMIN CANNOT EDIT GENERAL USER</h2>
			)} */
}
