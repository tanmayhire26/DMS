import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { loadLogin } from "../../actions/loginAction";
import IndexerNavbar from "./indexerNavbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function IndexerApp() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadLogin());
	}, []);

	return (
		<>
			<ToastContainer />
			<IndexerNavbar />
			<Outlet />
		</>
	);
}

export default IndexerApp;
