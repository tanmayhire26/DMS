import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import VerifyEmail from "../common/verifyEmail";
function GeneralUserProtectedRouter({ children }) {
	const token = useSelector((state) => state.loginReducer.token);
	// console.log("Protected Route", token);
	if (token) {
		const decoded = jwtDecode(token);
		if (
			decoded.role === "General User" &&
			decoded.isActive === true &&
			decoded.verified === true
		)
			return children;
		else if (
			decoded.role === "General User" &&
			decoded.verified === true &&
			decoded.isActive === false
		) {
			return (
				<>
					<img alt="Inactive user" src="/inactiveUser.jpg" />
					<div>You are an inactive user. Contact Admin.</div>
				</>
			);
		} else if (
			decoded.role === "General User" &&
			decoded.verified === false &&
			decoded.isActive === true
		) {
			return (
				<>
					<VerifyEmail email={decoded.email} />
				</>
			);
		} else return <Navigate to={"/login"} />;
	} else {
		return <Navigate to="/" />;
	}
}

export default GeneralUserProtectedRouter;
