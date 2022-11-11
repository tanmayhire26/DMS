import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { loadLogin } from "../../actions/loginAction";
import GeneralUser from "./generalUser";

function GuApp() {
	const disaptch = useDispatch();
	useEffect(() => {
		disaptch(loadLogin());
	}, []);
	return (
		<>
			<ToastContainer />
			<Outlet />
		</>
	);
}

export default GuApp;
