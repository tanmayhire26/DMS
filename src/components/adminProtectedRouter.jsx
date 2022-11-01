import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
function AdminProtectedRouter({ children }) {
	const token = useSelector((state) => state.loginReducer.token);
	// console.log("Protected Route", token);
	if (token) {
		const decoded = jwtDecode(token);
		if (decoded.role === "Admin") return children;
		
		else return <Navigate to={"/login"} />;
	}
	return <Navigate to={"/login"} />;
}

export default AdminProtectedRouter;
